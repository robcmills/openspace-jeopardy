import type { Server } from './Server';
import type { Socket } from './Socket';
import { gameStore } from './gameStore';

export function onLobbyEvents(socket: Socket, io: Server) {
  socket.on('joinLobby', () => {
    console.log('joinLobby')
    socket.join('lobby')

    io.in('lobby').fetchSockets().then(sockets => {
      io.to('lobby').emit('users', sockets.map(s => ({
          isConnected: true,
          id: s.data.userId,
          username: s.data.username,
        })
      ))
    })

    io.to('lobby').emit('games', gameStore.getAll())
  });
}
