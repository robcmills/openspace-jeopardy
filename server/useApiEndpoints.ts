import type { Express } from 'express'
import { gameStore } from './gameStore'
import { sessionStore } from './sessionStore'
import type { UserState } from '../client/src/UserState'
import { contestantStore } from './contestantStore'
import { spectatorStore } from './spectatorStore'
import type { Server } from './Server'
import type { GetGameResponse } from './GetGameResponse'
import type { Session } from './Session'

export function useApiEndpoints(app: Express, io: Server) {
  app.get('/api/games/:gameId', (req, res) => {
    // game
    const gameId = req.params.gameId
    const game = gameStore.getById(gameId)
    if (!game) {
      res.status(404).json({ error: 'Game not found' })
      return
    }

    const contestants = contestantStore.getByGameId(gameId)
    const spectators = spectatorStore.getByGameId(gameId)

    const users = [
      ...contestants,
      ...spectators,
      { userId: game.hostUserId}
    ]
      .map(({ userId }) => sessionStore.getByUserId(userId))
      .filter((session): session is Session => Boolean(session))
      .map(session => {
        const user: UserState = {
          id: session.userId,
          isConnected: session.isConnected,
          username: session.username,
        }
        return user
      })

    const getGameResponse: GetGameResponse = {
      contestants,
      game,
      spectators,
      users,
    }

    res.json(getGameResponse)
  })

  app.post('/api/games/:gameId/join', (req, res) => {
    const gameId = req.params.gameId
    const role = req.query.role
    if (!role || typeof role !== 'string') {
      res.status(400).json({ error: 'role is required' })
      return
    }
    const userId = req.query.userId
    if (!userId || typeof userId !== 'string') {
      res.status(400).json({ error: 'userId is required' })
      return
    }

    const session = sessionStore.getByUserId(userId)
    if (!session) {
      res.status(404).json({ error: 'User not found' })
      return
    }
    const user: UserState = {
      id: session.userId,
      isConnected: session.isConnected,
      username: session.username,
    }

    if (role === 'contestant') {
      const contestant = contestantStore.new(gameId, userId)
      io.to(gameId).emit('contestantJoined', { contestant, user })
      res.status(200).send()
      return
    }

    if (role === 'spectator') {
      const spectator = spectatorStore.new(gameId, userId)
      io.to(gameId).emit('spectatorJoined', { spectator, user })
      res.status(200).send()
      return
    }
  })
}
