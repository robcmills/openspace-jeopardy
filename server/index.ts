import express from 'express'
import { createServer } from 'http'
import { Server } from 'socket.io'

const PORT = 3000

const app = express()
const httpServer = createServer(app)
const io = new Server(httpServer, {})

app.get('/hello', (req, res) => {
  res.send('<h1>Hello world</h1>')
});

app.use(express.static('../client/dist'))

io.on('connection', (socket) => {
  console.log('connection')
  socket.on('disconnect', () => {
    console.log('disconnect')
  })
})

httpServer.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})
