import express from 'express'
import { createServer } from 'http'
import { Server } from 'socket.io'
import type {
  ClientToServerEvents,
  InterServerEvents,
  ServerToClientEvents,
  SocketData,
} from './socket-types'
import { useSessionMiddleware } from './useSessionMiddleware'
import { onConnection } from './onConnection'
import { onGameEvents } from './onGameEvents'
import { join } from 'path'
import { useApiEndpoints } from './useApiEndpoints'
import { onLobbyEvents } from './onLobbyEvents'

const PORT = 3000

const app = express()
const httpServer = createServer(app)
const io = new Server<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>(httpServer, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"]
  },
});

app.get('/', (_, res) => {
  res.redirect('/lobby');
});

app.get('/hello', (_, res) => {
  res.send('<h1>Hello world</h1>')
});

useApiEndpoints(app, io)

app.use(express.static('../client/dist'))

// Catch-all route to serve index.html for client-side routing
const CLIENT_INDEX_HTML = join(
  __dirname,
  '../client/dist',
  'index.html'
)
app.get('*', (_, res) => {
  res.sendFile(CLIENT_INDEX_HTML)
});

useSessionMiddleware(io)

io.on('connection', (socket) => {
  console.log(`${socket.data.username} connected`)
  onConnection(socket)
  onLobbyEvents(socket, io)
  onGameEvents(socket, io)
})

httpServer.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})
