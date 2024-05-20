import { jotaiStore } from './jotaiStore';
import { SocketClient } from './SocketClient';
import { Game } from '../../server/Game';
import { gameAtom } from './gameAtom';
import { gamesAtom } from './gamesAtom';

export function onSocketGameEvents(socket: SocketClient) {
  socket.on('gameCreated', (game: Game) => {
    console.log('gameCreated', game)
    jotaiStore.set(gameAtom, game)
  })

  /* Receive a list of all live games from server to show in Lobby */
  socket.on('games', (games: Game[]) => {
    console.log('games', games)
    jotaiStore.set(gamesAtom, games)
  })
}
