import type { Socket } from 'socket.io-client';
import { jotaiStore } from './jotaiStore';
import { UserState } from './UserState';
import { usersAtom } from './usersAtom';

export function onSocketUserEvents(socket: Socket) {
  socket.on('users', (users: UserState[]) => {
    console.log('users', users)
    const usersById = users.reduce((acc, user) => {
      acc[user.id] = { ...user, isConnected: true }
      return acc
    }, {} as Record<string, UserState>)
    console.log('usersById', usersById)

    jotaiStore.set(usersAtom, state => ({
      ...state,
      usersById,
    }))
  })

  socket.on('user connected', (user: UserState) => {
    console.log('user connected', user)
    jotaiStore.set(usersAtom, state => ({
      ...state,
      usersById: {
        ...state.usersById,
        [user.id]: { ...user, isConnected: true }
      }
    }))
  })

  socket.on('user disconnected', (userId: string) => {
    console.log('user disconnected', userId)
    jotaiStore.set(usersAtom, state => {
      return state.usersById[userId] 
        ? {
          ...state,
          usersById: {
            ...state.usersById,
            [userId]: { ...state.usersById[userId], isConnected: false }
          },
        }
        : state
    })
  })
}
