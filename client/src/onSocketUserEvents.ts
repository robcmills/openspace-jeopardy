import { jotaiStore } from './jotaiStore';
import { UserState } from './UserState';
import { usersAtom } from './usersAtom';
import { SocketClient } from './SocketClient';

export function onSocketUserEvents(socket: SocketClient) {
  socket.on('users', (users: UserState[]) => {
    console.log('users', users)
    const usersById = users.reduce((acc, user) => {
      acc[user.id] = user
      return acc
    }, {} as Record<string, UserState>)

    jotaiStore.set(usersAtom, state => ({
      ...state,
      usersById,
    }))
  })

  socket.on('userConnected', (user: UserState) => {
    console.log('user connected', user)
    jotaiStore.set(usersAtom, state => ({
      ...state,
      usersById: {
        ...state.usersById,
        [user.id]: user,
      }
    }))
  })

  socket.on('userDisconnected', (userId: string) => {
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
