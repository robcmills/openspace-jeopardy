import { GameState } from '../client/src/GameState'
import type { TileState } from '../client/src/TileState'
import type { UserState } from '../client/src/UserState'
import { initialTileState } from '../client/src/tilesAtoms'
import { initialCategoryState } from '../client/src/categoriesAtoms'
import type { Server } from './Server'
import type { Socket } from './Socket'
import { contestantStore } from './contestantStore'
import { gameStore } from './gameStore'
import { getAnswer } from './getAnswer'
import { getCategory } from './getCategory'
import { sessionStore } from './sessionStore'
import { spectatorStore } from './spectatorStore'

export function onGameEvents(socket: Socket, io: Server) {
  socket.on('activateRandomContestant', ({ contestantId, gameId }) => {
    console.log('activateRandomContestant', { contestantId, gameId })
    const game = gameStore.getById(gameId)
    if (game) {
      game.activeContestantId = contestantId
      game.previousActiveContestantId = contestantId
    } else {
      console.error(`Game not found for gameId: ${gameId}`)
    }
    io.to(gameId).emit('activateRandomContestant', { contestantId })
  })

  socket.on('clearTimer', ({ gameId }) => {
    console.log('clearTimer', { gameId })
    io.to(gameId).emit('clearTimer')
  })

  socket.on('contestantBuzzer', ({ contestantId, gameId }) => {
    console.log('contestantBuzzer', { contestantId, gameId })
    const game = gameStore.getById(gameId)
    if (!game) {
      console.error(`Game not found for gameId: ${gameId}`)
      return
    }
    if (game.activeContestantId) return
    game.activeContestantId = contestantId
    io.to(gameId).emit('setActiveContestant', { contestantId })
  })

  socket.on('getGame', (gameId: string) => {
    console.log('getGame', gameId)
    const game = gameStore.getById(gameId)
    if (!game) {
      console.error(`Game not found for gameId: ${gameId}`)
      return
    }
    socket.emit('game', game)
  })

  socket.on('hostNewGame', ({ episodeId, name }) => {
    console.log('hostNewGame')
    const newGame = gameStore.new(episodeId, socket.data.userId, name)
    socket.join(newGame.id)
    socket.emit('gameCreated', newGame)
    socket.emit('games', gameStore.getAll())
  })

  socket.on('joinGame', ({ gameId, userRole }) => {
    console.log('joinGame', { gameId, userRole })
    socket.leave('lobby')
    socket.join(gameId)

    const session = sessionStore.getByUserId(socket.data.userId)
    if (!session) {
      console.error(`Session not found for userId: ${socket.data.userId}`)
      return
    }
    const user: UserState = {
      id: session.userId,
      isConnected: true,
      username: session.username,
    }

    if (userRole === 'contestant') {
      const contestants = contestantStore.getByGameId(gameId)
      const contestant = contestants.find(
        ({ userId }) => userId === socket.data.userId,
      )
      if (!contestant) {
        console.error('Contestant not found', {
          username: user.username,
          gameId: gameId,
        })
        return
      }

      io.to(gameId).emit('contestantJoined', { contestant, user })
      return
    }

    if (userRole === 'spectator') {
      const spectators = spectatorStore.getByGameId(gameId)
      const spectator = spectators.find(
        ({ userId }) => userId === socket.data.userId,
      )
      if (!spectator) {
        console.error('Spectator not found', {
          username: user.username,
          gameId: gameId,
        })
        return
      }

      io.to(gameId).emit('spectatorJoined', { spectator, user })
      return
    }
  })

  socket.on('resetTiles', ({ gameId }) => {
    console.log('resetTiles', { gameId })
    const game = gameStore.getById(gameId)
    if (!game) {
      console.error(`Game not found for gameId: ${gameId}`)
      return
    }
    for (let column = 0; column < 6; column++) {
      game.categories[column] = { ...initialCategoryState }
      for (let row = 0; row < 5; row++) {
        game.tiles[column][row] = { ...initialTileState }
      }
    }
  })

  socket.on('restartTimer', ({ gameId }) => {
    console.log('restartTimer', { gameId })
    io.to(gameId).emit('restartTimer')
  })

  socket.on('setCategoryState', ({ column, gameId, state: { step } }) => {
    console.log('setCategoryState', { column, gameId, step })
    const game = gameStore.getById(gameId)
    if (!game) {
      console.error(`Game not found for gameId: ${gameId}`)
      return
    }
    const state = game.categories[column]
    state.step = step
    if (step === 'category') {
      const round =
        game.state === GameState.Jeopardy
          ? 1
          : game.state === GameState.DoubleJeopardy
            ? 2
            : 0
      state.category = getCategory({
        column,
        episodeId: game.episodeId,
        round,
      })
    }
    io.to(gameId).emit('setCategoryState', { column, state })
  })

  socket.on('revealTiles', ({ gameId }) => {
    console.log('revealTiles', { gameId })
    const game = gameStore.getById(gameId)
    if (game) {
      for (let column = 0; column < 6; column++) {
        for (let row = 0; row < 5; row++) {
          game.tiles[column][row].step = 'money'
        }
      }
    } else {
      console.error(`Game not found for gameId: ${gameId}`)
    }
    io.to(gameId).emit('revealTiles')
  })

  socket.on('setActiveContestant', ({ contestantId, gameId }) => {
    console.log('setActiveContestant', { contestantId, gameId })
    const game = gameStore.getById(gameId)
    if (!game) {
      console.error(`Game not found for gameId: ${gameId}`)
      return
    }
    game.activeContestantId = contestantId
    io.to(gameId).emit('setActiveContestant', { contestantId })
  })

  socket.on('setContestantQuestion', ({ contestantId, gameId, question }) => {
    console.log('setContestantQuestion', { contestantId, gameId, question })
    const contestant = contestantStore.contestantsById.get(contestantId)
    if (!contestant) {
      console.error(`Contestant not found for contestantId: ${contestantId}`)
      return
    }
    contestant.question = question
    // Resetting is fine to broadcast to all contestants
    if (question === '') {
      io.to(contestant.gameId).emit('setContestantQuestion', {
        contestantId,
        question,
      })
      return
    }
    const game = gameStore.getById(gameId)
    if (!game) {
      console.error(`Game not found for gameId: ${gameId}`)
      return
    }
    const host = sessionStore.getByUserId(game.hostUserId)
    if (!host) {
      console.error(`Host not found for hostUserId: ${game.hostUserId}`)
      return
    }
    // Setting question should not be broadcast to all contestants
    for (const socketId of host.socketIds) {
      io.to(socketId).emit('setContestantQuestion', {
        contestantId,
        question,
      })
    }
  })

  socket.on('setContestantScore', ({ contestantId, gameId, score }) => {
    console.log('setContestantScore', { contestantId, gameId, score })
    const contestant = contestantStore.contestantsById.get(contestantId)
    if (!contestant) {
      console.error(`Contestant not found for contestantId: ${contestantId}`)
      return
    }
    contestant.score = score
    io.to(gameId).emit('setContestantScore', { contestantId, score })
  })

  socket.on('setContestantWager', ({ contestantId, gameId, wager }) => {
    console.log('setContestantWager', { contestantId, gameId, wager })
    const contestant = contestantStore.contestantsById.get(contestantId)
    if (!contestant) {
      console.error(`Contestant not found for contestantId: ${contestantId}`)
      return
    }
    contestant.wager = wager
    // Resetting wager is fine to broadcast to all contestants
    if (wager < 0) {
      io.to(contestant.gameId).emit('setContestantWager', {
        contestantId,
        wager,
      })
      return
    }
    // Setting wager should not be broadcast to all contestants
    const game = gameStore.getById(gameId)
    if (!game) {
      console.error(`Game not found for gameId: ${gameId}`)
      return
    }
    const host = sessionStore.getByUserId(game.hostUserId)
    if (!host) {
      console.error(`Host not found for hostUserId: ${game.hostUserId}`)
      return
    }
    for (const socketId of host.socketIds) {
      io.to(socketId).emit('setContestantWager', { contestantId, wager })
    }
  })

  socket.on('setFinalJeopardyState', ({ gameId, state }) => {
    console.log('setFinalJeopardyState', { gameId, state })
    const game = gameStore.getById(gameId)
    if (!game) {
      console.error(`Game not found for gameId: ${gameId}`)
      return
    }
    game.finalJeopardy = state
    if (state.step === 'category') {
      const category = getCategory({
        column: 0,
        episodeId: game.episodeId,
        round: 3,
      })
      if (!category) {
        console.error('Final Jeopardy category not found')
      } else {
        state.category = category
      }
    }
    if (state.step === 'answer') {
      const answer = getAnswer({
        column: 1,
        episodeId: game.episodeId,
        row: 1,
        round: 3,
      })
      if (!answer) {
        console.error('Final Jeopardy answer not found')
      } else {
        state.answer = answer.answer
        // Send correct response to connected hosts
        const host = sessionStore.getByUserId(game.hostUserId)
        if (host) {
          for (const socketId of host.socketIds) {
            io.to(socketId).emit('setCorrectResponse', {
              correctResponse: answer.correctResponse,
            })
          }
        }
      }
    }
    io.to(gameId).emit('setFinalJeopardyState', { state })
  })

  socket.on('setGameState', ({ gameId, gameState }, callback) => {
    console.log('setGameState', { gameId, gameState })
    const game = gameStore.getById(gameId)
    if (game) {
      game.state = gameState
    } else {
      console.error(`Game not found for gameId: ${gameId}`)
    }
    callback()
    io.to(gameId).emit('setGameState', { gameId, gameState })
  })

  socket.on('setPreviousActiveContestant', ({ contestantId, gameId }) => {
    console.log('setPreviousActiveContestant', { contestantId, gameId })
    const game = gameStore.getById(gameId)
    if (!game) {
      console.error(`Game not found for gameId: ${gameId}`)
      return
    }
    game.previousActiveContestantId = contestantId
  })

  socket.on('cycleTileState', ({ gameId, column, row }) => {
    console.log('cycleTileState', { gameId, column, row })
    const game = gameStore.getById(gameId)
    if (!game) {
      console.error(`Game not found for gameId: ${gameId}`)
      return
    }

    const round =
      game.state === GameState.Jeopardy
        ? 1
        : game.state === GameState.DoubleJeopardy
          ? 2
          : 0
    const answer = getAnswer({
      column: column + 1,
      episodeId: game.episodeId,
      row: row + 1,
      round,
    })

    const oldState = game.tiles[column][row]

    const nextStep = (
      {
        logo: 'money',
        money: answer?.isDailyDouble ? 'dailyDouble' : 'answer',
        dailyDouble: 'answer',
        answer: 'blank',
        blank: 'logo',
      } as const
    )[oldState.step]

    const newState: TileState = { ...oldState, step: nextStep }

    if (answer && ['dailyDouble', 'answer'].includes(nextStep)) {
      newState.answer = answer.answer
      newState.isDailyDouble = answer.isDailyDouble
      // Send correct response to connected hosts
      const host = sessionStore.getByUserId(game.hostUserId)
      if (host) {
        for (const socketId of host.socketIds) {
          io.to(socketId).emit('setCorrectResponse', {
            correctResponse: answer.correctResponse,
          })
        }
      }
    }

    game.tiles[column][row] = newState

    if (nextStep === 'answer' && oldState.step !== 'dailyDouble') {
      game.activeContestantId = null
      io.to(gameId).emit('setActiveContestant', { contestantId: null })
    }

    if (
      nextStep === 'blank' &&
      !game.activeContestantId &&
      game.previousActiveContestantId !== null
    ) {
      game.activeContestantId = game.previousActiveContestantId
      io.to(gameId).emit('setActiveContestant', {
        contestantId: game.previousActiveContestantId,
      })
    }

    io.to(gameId).emit('setTileState', { column, row, state: newState })
  })

  socket.on('toggleTimer', ({ gameId }) => {
    console.log('toggleTimer', { gameId })
    io.to(gameId).emit('toggleTimer')
  })

  socket.on('zoomCategories', ({ direction, gameId }) => {
    console.log('zoomCategories', { direction, gameId })
    io.to(gameId).emit('zoomCategories', { direction })
  })

  socket.on('panCategories', ({ gameId }) => {
    console.log('panCategories', { gameId })
    io.to(gameId).emit('panCategories')
  })
}
