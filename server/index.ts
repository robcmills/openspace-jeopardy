import express from 'express'
import { createServer as createHttpServer } from 'http'
import { createServer as createHttpsServer } from 'https'
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
import { readFileSync } from 'fs'

const IS_PROD = !!process.env.PRODUCTION
const PORT = IS_PROD ? 443 : 3000

const app = express()

const options = {
  key: readFileSync('../ssl/www_jeopardyweb_app.key'),
  cert: readFileSync('../ssl/www_jeopardyweb_app.crt'),
}
const httpServer = IS_PROD
  ? createHttpsServer(options, app)
  : createHttpServer(app)

const io = new Server<
  ClientToServerEvents,
  ServerToClientEvents,
  InterServerEvents,
  SocketData
>(httpServer, {
  cors: {
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST'],
  },
})

app.get('/', (_, res) => {
  res.redirect('/lobby')
})

app.get('/hello', (_, res) => {
  res.send('<h1>Hello world</h1>')
})

useApiEndpoints(app, io)

app.use(express.static('../client/dist'))

// Catch-all route to serve index.html for client-side routing
const CLIENT_INDEX_HTML = join(__dirname, '../client/dist', 'index.html')
app.get('*', (_, res) => {
  res.sendFile(CLIENT_INDEX_HTML)
})

useSessionMiddleware(io)

io.on('connection', (socket) => {
  console.log(`${socket.data.username} connected`)
  onConnection(socket)
  onLobbyEvents(socket, io)
  onGameEvents(socket, io)
})

httpServer.listen(PORT, () => {
  console.log(`\nHttp Server listening on port ${PORT}`)
})
