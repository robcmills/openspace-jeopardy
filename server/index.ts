import express from 'express'
import { createServer } from 'http'
import { Server } from 'socket.io'
import { sessionStore } from './sessionStore'
import type {
  ClientToServerEvents,
  InterServerEvents,
  ServerToClientEvents,
  SocketData,
} from './socket-types'
import { useSessionMiddleware } from './useSessionMiddleware'

const PORT = 3000

const app = express()
const httpServer = createServer(app)
const io = new Server<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>(httpServer, {});

app.get('/hello', (_, res) => {
  res.send('<h1>Hello world</h1>')
});

app.use(express.static('../client/dist'))

useSessionMiddleware(io)

io.on('connection', (socket) => {
  console.log(`${socket.data.username} connected`)

  // Persist session
  sessionStore.set(socket.data.sessionId, {
    isConnected: true,
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
      isConnected: session.isConnected,
      id: session.userId,
      username: session.username,
    }))
  );

  // Broadcast user connection
  socket.broadcast.emit('userConnected', {
    isConnected: true,
    id: socket.data.userId,
    username: socket.data.username,
  })

  socket.on('disconnect', async () => {
    console.log(`${socket.data.username} disconnected`)
    const matchingSockets = await io.in(socket.data.userId).allSockets();
    const isDisconnected = matchingSockets.size === 0;
    if (!isDisconnected) return;
    socket.broadcast.emit('userDisconnected', socket.data.userId);
    sessionStore.set(socket.data.sessionId, {
      userId: socket.data.userId,
      username: socket.data.username,
      isConnected: false,
      sessionId: socket.data.sessionId,
    });
  })
})

httpServer.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})
