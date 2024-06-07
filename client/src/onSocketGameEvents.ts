import { jotaiStore } from './jotaiStore';
import { SocketClient } from './SocketClient';
import { Game } from '../../server/Game';
import { gameAtom } from './gameAtom';
import { gamesAtom } from './gamesAtom';
import { getGamePath } from './getGamePath';
import { navigate } from './navigate';
import { contestantsAtom } from './contestantsAtom';
import { usersAtom } from './usersAtom';

export function onSocketGameEvents(socket: SocketClient) {
  socket.on('game', (game: Game) => {
    console.log('game', game)
    jotaiStore.set(gameAtom, game)
  })

  socket.on('gameCreated', (game: Game) => {
    console.log('gameCreated', game)
    navigate.to(getGamePath(game.id))
    jotaiStore.set(gameAtom, game)
  })

  socket.on('gameJoined', (game: Game) => {
    console.log('gameJoined', game)
    jotaiStore.set(gameAtom, game)
  })

  /* Receive a list of all live games from server to show in Lobby */
  socket.on('games', (games: Game[]) => {
    console.log('games', games)
    jotaiStore.set(gamesAtom, games)
  })

  socket.on('contestantJoined', ({ contestant, user }) => {
    console.log('contestantJoined', { contestant, user })
    jotaiStore.set(contestantsAtom, state => {
      return {
        ...state,
        contestantsById: {
          ...state.contestantsById,
          [contestant.id]: contestant,
        },
      }
    })
    jotaiStore.set(usersAtom, state => ({
      ...state,
      usersById: {
        ...state.usersById,
        [user.id]: user,
      },
    }))
  })

  socket.on('userDisconnected', (userId: string) => {
    console.log('userDisconnected', userId)
    jotaiStore.set(contestantsAtom, state => {
      const contestantsById = { ...state.contestantsById }
      for (const id in contestantsById) {
        if (contestantsById[id].userId === userId) {
          delete contestantsById[id]
        }
      }
      return {
        ...state,
        contestantsById,
      }
    })
    // todo: spectators
  })
}
