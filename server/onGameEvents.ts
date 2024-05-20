import type { Socket } from './Socket';
import { gameStore } from './gameStore';

export function onGameEvents(socket: Socket) {
  socket.on('hostNewGame', (name: string) => {
    console.log('hostNewGame')
    const newGame = gameStore.new({
      name,
      hostUserId: socket.data.userId
    })
    socket.emit('gameCreated', newGame)
  });
}
