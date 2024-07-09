import { SocketClient } from './SocketClient'
import { jotaiStore } from './jotaiStore'
import { socketAtom } from './socketAtom'

export function onSocketSessionEvents(socket: SocketClient) {
  const sessionId = localStorage.getItem('sessionId')

  if (sessionId) {
    jotaiStore.set(socketAtom, state => ({
      ...state,
      sessionId,
    }))
    socket.auth = { sessionId }
    socket.connect()
  }

  socket.on('session', ({ sessionId, socketId, userId, username }) => {
    console.log('session', { sessionId, socketId, userId, username })
    // attach the session ID to the next reconnection attempts
    socket.auth = { sessionId }
    localStorage.setItem('sessionId', sessionId)
    jotaiStore.set(socketAtom, state => ({
      ...state,
      isSessionEstablished: true,
      sessionId,
      socketId,
      userId,
      username,
    }))
  })

  socket.on('connect', () => {
    console.log('connected')
    jotaiStore.set(socketAtom, state => ({
      ...state,
      isConnected: true,
      isConnectionError: false,
    }))
  })

  socket.on('disconnect', () => {
    console.log('disconnected')
    jotaiStore.set(socketAtom, state => ({
      ...state,
      isConnected: false,
      isConnectionError: false,
    }))
  })

  socket.on('connect_error', (error: Error) => {
    console.error('connect_error', { error })
    if (error.message === 'Invalid session') {
      localStorage.removeItem('sessionId')
    }
    jotaiStore.set(socketAtom, state => ({
      ...state,
      isConnectionError: true,
      sessionId: null,
    }))
  })
}
