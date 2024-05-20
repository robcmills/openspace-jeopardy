import type { Socket } from './Socket'
import { gameStore } from './gameStore'
import { sessionStore } from './sessionStore'

export function onConnection(socket: Socket) {
  // Persist session
  sessionStore.set(socket.data.sessionId, {
    isConnected: true,
    sessionId: socket.data.sessionId,
    userId: socket.data.userId,
    username: socket.data.username,
  })

  // Emit session details
  socket.emit('session', {
    sessionId: socket.data.sessionId,
    userId: socket.data.userId,
    username: socket.data.username,
  })

  // Emit users
  socket.emit('users', sessionStore
    .getAll()
    .map(session => ({
      isConnected: session.isConnected,
      id: session.userId,
      username: session.username,
    }))
  )

  // Emit live games
  socket.emit('games', gameStore.getAll())

  // Broadcast user connection
  socket.broadcast.emit('userConnected', {
    isConnected: true,
    id: socket.data.userId,
    username: socket.data.username,
  })

  socket.on('disconnect', async () => {
    console.log(`${socket.data.username} disconnected`)
    const matchingSockets = await socket.in(socket.data.userId).allSockets()
    const isDisconnected = matchingSockets.size === 0
    if (!isDisconnected) return
    socket.broadcast.emit('userDisconnected', socket.data.userId)
    sessionStore.set(socket.data.sessionId, {
      userId: socket.data.userId,
      username: socket.data.username,
      isConnected: false,
      sessionId: socket.data.sessionId,
    })
  })
}
