import { jotaiStore } from './jotaiStore';
import { SocketClient } from './SocketClient';
import { Game } from '../../server/Game';
import { gameAtom } from './gameAtom';

export function onSocketGameEvents(socket: SocketClient) {
  socket.on('gameCreated', (game: Game) => {
    console.log('gameCreated', game)
    jotaiStore.set(gameAtom, game)
  })
}
