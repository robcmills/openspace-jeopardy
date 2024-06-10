import type { UserState } from '../client/src/UserState'
import type { Server } from './Server'
import type { Socket } from './Socket'
import { contestantStore } from './contestantStore'
import { gameStore } from './gameStore'
import { sessionStore } from './sessionStore'
import { spectatorStore } from './spectatorStore'

export function onGameEvents(socket: Socket, io: Server) {
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

  socket.on('setGameState', ({ gameId, gameState }) => {
    console.log('setGameState', { gameId, gameState })
    io.to(gameId).emit('setGameState', { gameId, gameState })
  })

  socket.on('setTileState', ({ gameId, ...data }) => {
    console.log('setTileState', data)
    io.to(gameId).emit('setTileState', data)
  })

  socket.on('revealCategory', ({ column, gameId }) => {
    console.log('revealCategory', { column, gameId })
    io.to(gameId).emit('revealCategory', { column })
  })

  socket.on('revealTiles', ({ gameId }) => {
    console.log('revealTiles', { gameId })
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
