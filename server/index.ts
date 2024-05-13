import express from 'express'
import { createServer } from 'http'
import { Server } from 'socket.io'

const PORT = 3000

const app = express()
const httpServer = createServer(app)
const io = new Server(httpServer, {})

app.get('/', (req, res) => {
  res.send('<h1>Hello world</h1>');
});

io.on('connection', (socket) => {
  console.log('on connection', socket)
})

httpServer.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})
