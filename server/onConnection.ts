import type { Socket } from './Socket'
import { sessionStore } from './sessionStore'

export function onConnection(socket: Socket) {
  // Persist session
  sessionStore.set(socket.data.sessionId, {
    isConnected: true,
    sessionId: socket.data.sessionId,
    socketId: socket.id,
    userId: socket.data.userId,
    username: socket.data.username,
  })

  // Emit session details
  socket.emit('session', {
    sessionId: socket.data.sessionId,
    socketId: socket.id,
    userId: socket.data.userId,
    username: socket.data.username,
  })

  socket.on('disconnect', async () => {
    console.log(`${socket.data.username} disconnected`)
    const matchingSockets = await socket.in(socket.data.userId).allSockets()
    const isDisconnected = matchingSockets.size === 0
    if (!isDisconnected) return
    socket.broadcast.emit('userDisconnected', socket.data.userId)
    sessionStore.set(socket.data.sessionId, {
      isConnected: false,
      sessionId: socket.data.sessionId,
      socketId: socket.id,
      userId: socket.data.userId,
      username: socket.data.username,
    })
  })
}
