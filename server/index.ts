import express from 'express'
import { createServer } from 'http'
import { Server } from 'socket.io'
import { randomId } from './randomId'
import { sessionStore } from './sessionStore'
import type {
  ClientToServerEvents,
  InterServerEvents,
  ServerToClientEvents,
  SocketData,
} from './socket-types'

const PORT = 3000

const app = express()
const httpServer = createServer(app)
const io = new Server<
  ServerToClientEvents,
  ClientToServerEvents,
  InterServerEvents,
  SocketData
>(httpServer, {});

app.get('/hello', (_, res) => {
  res.send('<h1>Hello world</h1>')
});

app.use(express.static('../client/dist'))

io.use((socket, next) => {
  const sessionId = socket.handshake.auth.sessionId;
  if (sessionId) {
    const session = sessionStore.get(sessionId);
    if (session) {
      socket.data.sessionId = sessionId;
      socket.data.userId = session.userId;
      socket.data.username = session.username;
      return next();
    }
  }
  const username = socket.handshake.auth.username;
  if (!username) {
    return next(new Error('Invalid username'));
  }
  socket.data.sessionId = randomId();
  socket.data.userId = randomId();
  socket.data.username = username;
  next();
});

io.on('connection', (socket) => {
  console.log(`${socket.data.username} connected`)

  // Persist session
  sessionStore.set(socket.data.sessionId, {
    connected: true,
    sessionId: socket.data.sessionId,
    userId: socket.data.userId,
    username: socket.data.username,
  });

  // Emit session details
  socket.emit('session', {
    sessionId: socket.data.sessionId,
    userId: socket.data.userId,
    username: socket.data.username,
  });

  // Emit users
  socket.emit('users', sessionStore
    .getAll()
    .map(session => ({
      userId: session.userId,
      username: session.username,
    }))
  );

  // Broadcast user connection
  socket.broadcast.emit('user connected', {
    connected: true,
    userId: socket.data.userId,
    username: socket.data.username,
  })

  socket.on('disconnect', async () => {
    console.log(`${socket.data.username} disconnected`)
    const matchingSockets = await io.in(socket.data.userId).allSockets();
    const isDisconnected = matchingSockets.size === 0;
    if (!isDisconnected) return;
    socket.broadcast.emit('user disconnected', socket.data.userId);
    sessionStore.set(socket.data.sessionId, {
      userId: socket.data.userId,
      username: socket.data.username,
      connected: false,
      sessionId: socket.data.sessionId,
    });
  })
})

httpServer.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})
