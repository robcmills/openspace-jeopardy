import type { Socket } from './Socket';
import { gameStore } from './gameStore';

export function onGameEvents(socket: Socket) {
  socket.on('hostNewGame', (name: string) => {
    console.log('hostNewGame')
    const newGame = gameStore.new(
      socket.data.userId,
      name,
    )
    socket.join(newGame.id)
    socket.emit('gameCreated', newGame)
    socket.emit('games', gameStore.getAll())
  });

  socket.on('joinGame', (gameId: string) => {
    console.log('joinGame')
    const game = gameStore.getById(gameId)
    if (!game) {
      console.error(`Game not found for gameId: ${gameId}`)
      return
    }
    socket.join(gameId)
    socket.emit('gameJoined', game)
  });
}
