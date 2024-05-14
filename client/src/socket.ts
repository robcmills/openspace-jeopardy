import { io } from 'socket.io-client'
import { socketAtom } from './socketAtom'
import { jotaiStore } from './jotaiStore'

export const socket = io()

socket.on('connect', () => {
  console.log('connected')
  jotaiStore.set(socketAtom, state => ({ ...state, isConnected: true }))
})

socket.on('disconnect', () => {
  console.log('disconnected')
  jotaiStore.set(socketAtom, state => ({ ...state, isConnected: false }))
})
