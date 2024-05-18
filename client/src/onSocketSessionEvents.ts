import type { Socket } from 'socket.io-client';
import { jotaiStore } from './jotaiStore';
import { socketAtom } from './socketAtom';

export function onSocketSessionEvents(socket: Socket) {
  console.log('onSocketSessionEvents')
  const sessionId = localStorage.getItem('sessionId');

  if (sessionId) {
    socket.auth = { sessionId };
    socket.connect();
  }

  socket.on('session', ({ sessionId, userId, username }) => {
    console.log('session', { sessionId, userId, username })
    // attach the session ID to the next reconnection attempts
    socket.auth = { sessionId }
    localStorage.setItem('sessionId', sessionId)
    // socket.data.userID = userID;
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
}