import type { Server } from './Server'
import { randomId } from './randomId'
import { sessionStore } from './sessionStore'

export function useSessionMiddleware(io: Server) {
  io.use((socket, next) => {
    console.log('useSessionMiddleware', socket.handshake.auth)
    const sessionId = socket.handshake.auth.sessionId
    if (sessionId) {
      const session = sessionStore.get(sessionId)
      if (session) {
        socket.data.sessionId = sessionId
        socket.data.userId = session.userId
        socket.data.username = session.username
        return next()
      }
      // session expired
      console.log('Invalid session')
      return next(new Error('Invalid session'))
    }
    const username = socket.handshake.auth.username
    if (!username) {
      return next(new Error('Invalid username'))
    }
    socket.data.sessionId = randomId()
    socket.data.userId = randomId()
    socket.data.username = username
    next()
  })
}
