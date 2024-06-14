import { jotaiStore } from './jotaiStore'
import { SocketClient } from './SocketClient'
import { ServerGame } from '../../server/ServerGame'
import { gameAtom } from './gameAtom'
import { gamesAtom } from './gamesAtom'
import { getGamePath } from './getGamePath'
import { navigate } from './navigate'
import { contestantsAtom } from './contestantsAtom'
import { usersAtom } from './usersAtom'
import { spectatorsAtom } from './spectatorsAtom'
import { revealTiles } from './revealTiles'
import { resetTiles } from './resetTiles'
import { zoomInCategories, zoomOutCategories } from './zoomCategories'
import { panCategories } from './panCategories'
import { getIsHost } from './getIsHost'
import { revealCategory } from './revealCategory'
import { tilesAtoms } from './tilesAtoms'
import { finalJeopardyAtom } from './finalJeopardyAtom'
import { activateRandomContestant } from './activateRandomContestant'
import { activeContestantAtom } from './activeContestantAtom'

export function onSocketGameEvents(socket: SocketClient) {
  socket.on('activateContestant', ({ contestantId }) => {
    console.log('activateContestant', contestantId)
    jotaiStore.set(activeContestantAtom, contestantId)
  })

  socket.on('activateRandomContestant', ({ contestantId }) => {
    console.log('activateRandomContestant', contestantId)
    activateRandomContestant(contestantId)
  })

  socket.on('game', (game: ServerGame) => {
    console.log('game', game)
    jotaiStore.set(gameAtom, game)
  })

  socket.on('gameCreated', (game: ServerGame) => {
    console.log('gameCreated', game)
    navigate.to(getGamePath(game.id))
    jotaiStore.set(gameAtom, game)
  })

  socket.on('gameJoined', (game: ServerGame) => {
    console.log('gameJoined', game)
    jotaiStore.set(gameAtom, game)
  })

  /* Receive a list of all live games from server to show in Lobby */
  socket.on('games', (games: ServerGame[]) => {
    console.log('games', games)
    jotaiStore.set(gamesAtom, games)
  })

  socket.on('setFinalJeopardyState', ({ state }) => {
    console.log('setFinalJeopardyState', state)
    jotaiStore.set(finalJeopardyAtom, state)
  })

  socket.on('setGameState', ({ gameId, gameState }) => {
    console.log('setGameState', gameState)
    if (getIsHost()) return
    resetTiles()
    navigate.to(getGamePath(gameId, gameState))
  })

  socket.on('setTileState', ({ column, row, state }) => {
    console.log('setTileState', { column, row, state })
    if (getIsHost()) return
    jotaiStore.set(tilesAtoms[column][row], state)
    if (state === 'answer') jotaiStore.set(activeContestantAtom, null)
  })

  socket.on('revealCategory', ({ column }) => {
    console.log('revealCategory')
    if (getIsHost()) return
    revealCategory(column)
  })

  socket.on('revealTiles', () => {
    console.log('revealTiles')
    if (getIsHost()) return
    revealTiles()
  })

  socket.on('zoomCategories', ({ direction }) => {
    console.log('zoomCategories', direction)
    if (getIsHost()) return
    direction === 'in'
      ? zoomInCategories()
      : zoomOutCategories()
  })

  socket.on('panCategories', () => {
    console.log('panCategories')
    if (getIsHost()) return
    panCategories()
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

  socket.on('spectatorJoined', ({ spectator, user }) => {
    console.log('spectatorJoined', { spectator, user })
    jotaiStore.set(spectatorsAtom, state => {
      return {
        ...state,
        spectatorsById: {
          ...state.spectatorsById,
          [spectator.id]: spectator,
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

    jotaiStore.set(spectatorsAtom, state => {
      const spectatorsById = { ...state.spectatorsById }
      for (const id in spectatorsById) {
        if (spectatorsById[id].userId === userId) {
          delete spectatorsById[id]
        }
      }
      return {
        ...state,
        spectatorsById,
      }
    })
  })
}
