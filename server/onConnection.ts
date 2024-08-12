import type { Socket } from './Socket'
import { sessionStore } from './sessionStore'

export function onConnection(socket: Socket) {
  // Persist session
  const session = sessionStore.set({
    isConnected: true,
    sessionId: socket.data.sessionId,
    socketIds: [socket.id],
    userId: socket.data.userId,
    username: socket.data.username,
  })

  // Emit session details
  socket.emit('session', {
    sessionId: session.sessionId,
    socketIds: session.socketIds,
    userId: session.userId,
    username: session.username,
  })

  socket.on('disconnect', async () => {
    console.log(`${socket.data.username} disconnected`)
    const matchingSockets = await socket.in(socket.data.userId).allSockets()
    const isDisconnected = matchingSockets.size === 0
    if (!isDisconnected) return
    socket.broadcast.emit('userDisconnected', socket.data.userId)
    const session = sessionStore.get(socket.data.sessionId)
    if (!session) return
    session.isConnected = false
  })
}
