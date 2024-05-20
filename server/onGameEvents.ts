import type { Socket } from './Socket';
import { gameStore } from './gameStore';

export function onGameEvents(socket: Socket) {
  socket.on('hostNewGame', () => {
    console.log('hostNewGame')
    const newGame = gameStore.new(socket.data.userId)
    socket.emit('gameCreated', newGame)
  });
}
