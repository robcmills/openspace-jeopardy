import { io } from 'socket.io-client'
import { socketAtom } from './socketAtom'
import { jotaiStore } from './jotaiStore'

export const socket = io({ autoConnect: false })

const sessionId = localStorage.getItem('sessionId');

if (sessionId) {
  // this.usernameAlreadySelected = true;
  socket.auth = { sessionId };
  socket.connect();
}

socket.on('session', ({ sessionId, userId, username }) => {
  console.log('session', { sessionId, userId, username })
  // attach the session ID to the next reconnection attempts
  socket.auth = { sessionId }
  localStorage.setItem('sessionId', sessionId)
  // socket.userID = userID;
  jotaiStore.set(socketAtom, state => ({
    ...state,
    isConnected: true,
    isConnectionError: false,
    sessionId,
    userId,
    username,
  }))
});

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
  console.error('connect_error', error)
  jotaiStore.set(socketAtom, state => ({
    ...state,
    isConnectionError: true,
  }))
})
