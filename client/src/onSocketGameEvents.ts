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
import { setCategoryState } from './setCategoryState'
import { tilesAtoms } from './tilesAtoms'
import { finalJeopardyAtom } from './finalJeopardyAtom'
import { activateRandomContestant } from './activateRandomContestant'
import { activeContestantAtom } from './activeContestantAtom'
import { setContestant } from './setContestant'
import { clearTimer, restartTimer, toggleTimer } from './timerActions'
import { getIsContestant } from './getIsContestant'

export function onSocketGameEvents(socket: SocketClient) {
  socket.on('activateRandomContestant', ({ contestantId }) => {
    console.log('activateRandomContestant', contestantId)
    activateRandomContestant(contestantId)
  })

  socket.on('clearTimer', () => {
    console.log('clearTimer')
    clearTimer()
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

  socket.on('restartTimer', () => {
    console.log('restartTimer')
    if (getIsHost()) return
    restartTimer()
  })

  socket.on('setCategoryState', ({ column, state }) => {
    console.log('setCategoryState', { column, state })
    setCategoryState({ column, state })
  })

  socket.on('revealTiles', () => {
    console.log('revealTiles')
    if (getIsHost()) return
    revealTiles()
  })

  socket.on('setActiveContestant', ({ contestantId }) => {
    console.log('setActiveContestant', contestantId)
    jotaiStore.set(activeContestantAtom, contestantId)
  })

  socket.on('setContestantQuestion', ({ contestantId, question }) => {
    console.log('setContestantQuestion', { contestantId, question })
    setContestant({ id: contestantId, question })
  })

  socket.on('setContestantScore', ({ contestantId, score }) => {
    console.log('setContestantScore', { contestantId, score })
    setContestant({ id: contestantId, score })
  })

  socket.on('setContestantWager', ({ contestantId, wager }) => {
    console.log('setContestantWager', { contestantId, wager })
    setContestant({ id: contestantId, wager })
  })

  socket.on('setFinalJeopardyState', ({ state }) => {
    console.log('setFinalJeopardyState', state)
    const isContestant = getIsContestant()
    // Host will cycle the finalJeopardyState when 30 second audio ends.
    // Contestants will have their local form state submitted at this
    // point (if they haven't already submitted), so we need to listen to
    // this event in the form component (instead of here).
    if (isContestant && state.step === 'logo') return
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
    jotaiStore.set(tilesAtoms[column][row], state)
  })

  socket.on('toggleTimer', () => {
    console.log('toggleTimer')
    if (getIsHost()) return
    toggleTimer()
  })

  socket.on('zoomCategories', ({ direction }) => {
    console.log('zoomCategories', direction)
    if (getIsHost()) return
    direction === 'in' ? zoomInCategories() : zoomOutCategories()
  })

  socket.on('panCategories', () => {
    console.log('panCategories')
    if (getIsHost()) return
    panCategories()
  })

  socket.on('contestantJoined', ({ contestant, user }) => {
    console.log('contestantJoined', { contestant, user })
    jotaiStore.set(contestantsAtom, (state) => {
      return {
        ...state,
        contestantsById: {
          ...state.contestantsById,
          [contestant.id]: contestant,
        },
      }
    })
    jotaiStore.set(usersAtom, (state) => ({
      ...state,
      usersById: {
        ...state.usersById,
        [user.id]: user,
      },
    }))
  })

  socket.on('spectatorJoined', ({ spectator, user }) => {
    console.log('spectatorJoined', { spectator, user })
    jotaiStore.set(spectatorsAtom, (state) => {
      return {
        ...state,
        spectatorsById: {
          ...state.spectatorsById,
          [spectator.id]: spectator,
        },
      }
    })
    jotaiStore.set(usersAtom, (state) => ({
      ...state,
      usersById: {
        ...state.usersById,
        [user.id]: user,
      },
    }))
  })

  socket.on('userDisconnected', (userId: string) => {
    console.log('userDisconnected', userId)

    jotaiStore.set(contestantsAtom, (state) => {
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

    jotaiStore.set(spectatorsAtom, (state) => {
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
