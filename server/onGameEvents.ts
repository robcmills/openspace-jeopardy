import type { UserState } from '../client/src/UserState'
import type { Server } from './Server'
import type { Socket } from './Socket'
import { contestantStore } from './contestantStore'
import { gameStore } from './gameStore'
import { sessionStore } from './sessionStore'
import { spectatorStore } from './spectatorStore'

export function onGameEvents(socket: Socket, io: Server) {
  socket.on('activateRandomContestant', ({ contestantId, gameId }) => {
    console.log('activateRandomContestant', { contestantId, gameId })
    const game = gameStore.getById(gameId)
    if (game) {
      game.activeContestantId = contestantId
    } else {
      console.error(`Game not found for gameId: ${gameId}`)
    }
    io.to(gameId).emit('activateRandomContestant', { contestantId })
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

  socket.on('hostNewGame', (name: string) => {
    console.log('hostNewGame')
    const newGame = gameStore.new(
      socket.data.userId,
      name,
    )
    socket.join(newGame.id)
    socket.emit('gameCreated', newGame)
    socket.emit('games', gameStore.getAll())
  })

  socket.on('joinGame', ({ gameId, userRole }) => {
    console.log('joinGame', { gameId, userRole })
    socket.join(gameId)

    const session = sessionStore.getByUserId(socket.data.userId)
    if (!session) {
      console.error(`Session not found for userId: ${socket.data.userId}`)
      return
    }
    const user: UserState = {
      id: session.userId,
      isConnected: session.isConnected,
      username: session.username,
    }

    if (userRole === 'contestant') {
      const contestants = contestantStore.getByGameId(gameId)
      const contestant = contestants
        .find(({ userId }) => userId === socket.data.userId)
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
      const spectator = spectators
        .find(({ userId }) => userId === socket.data.userId)
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

  socket.on('setContestantScore', ({ contestantId, gameId, score }) => {
    console.log('setContestantScore', { contestantId, gameId, score })
    const contestant = contestantStore.contestantsById.get(contestantId)
    if (!contestant) {
      console.error(
        `Contestant not found for contestantId: ${contestantId}`
      )
      return
    }
    contestant.score = score
    io.to(gameId).emit('setContestantScore', { contestantId, score })
  })

  socket.on('setFinalJeopardyState', ({ gameId, state }) => {
    console.log('setFinalJeopardyState', { gameId, state })
    const game = gameStore.getById(gameId)
    if (game) {
      game.finalJeopardy = state
    } else {
      console.error(`Game not found for gameId: ${gameId}`)
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

  socket.on('setTileState', ({ gameId, ...data }) => {
    console.log('setTileState', data)
    const game = gameStore.getById(gameId)
    if (!game) {
      console.error(`Game not found for gameId: ${gameId}`)
      return
    }
    game.tiles[data.column][data.row] = data.state
    io.to(gameId).emit('setTileState', data)
  })

  socket.on('resetTiles', ({ gameId }) => {
    console.log('resetTiles', { gameId })
    const game = gameStore.getById(gameId)
    if (game) {
      for (let column = 0; column < 6; column++) {
        game.categories[column] = 'logo'
        for (let row = 0; row < 6; row++) {
          game.tiles[column][row] = 'logo'
        }
      }
    } else {
      console.error(`Game not found for gameId: ${gameId}`)
    }
  })

  socket.on('revealCategory', ({ column, gameId }) => {
    console.log('revealCategory', { column, gameId })
    const game = gameStore.getById(gameId)
    if (game) {
      const currentCategory = game.categories[column]
      game.categories[column] = currentCategory === 'logo'
        ? 'category'
        : 'logo'
    } else {
      console.error(`Game not found for gameId: ${gameId}`)
    }
    io.to(gameId).emit('revealCategory', { column })
  })

  socket.on('revealTiles', ({ gameId }) => {
    console.log('revealTiles', { gameId })
    const game = gameStore.getById(gameId)
    if (game) {
      for (let column = 0; column < 6; column++) {
        for (let row = 0; row < 5; row++) {
          game.tiles[column][row] = 'money'
        }
      }
    } else {
      console.error(`Game not found for gameId: ${gameId}`)
    }
    io.to(gameId).emit('revealTiles')
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
