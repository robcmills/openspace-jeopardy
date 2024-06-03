import { SocketClient } from './SocketClient';
import { jotaiStore } from './jotaiStore';
import { usersAtom } from './usersAtom';

export function onSocketLobbyEvents(socket: SocketClient) {
  socket.on('userJoinedLobby', (user) => {
    console.log('userJoinedLobby', user)
    jotaiStore.set(usersAtom, state => ({
      ...state,
      usersById: {
        ...state.usersById,
        [user.id]: user,
      }
    }))
  })
}
