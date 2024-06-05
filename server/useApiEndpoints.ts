import type { Express } from 'express'
import { gameStore } from './gameStore'
import { sessionStore } from './sessionStore'
import type { UserState } from '../client/src/UserState'
import { contestantStore } from './contestantStore'

export function useApiEndpoints(app: Express) {
  app.get('/api/games/:gameId', (req, res) => {
    // game
    const gameId = req.params.gameId
    const game = gameStore.getById(gameId)
    if (!game) {
      res.status(404).json({ error: 'Game not found' })
      return
    }

    // host
    const hostSession = sessionStore.getByUserId(game.hostUserId)
    if (!hostSession) {
      res.status(404).json({ error: 'Host not found' })
      return
    }
    const host: UserState = {
      id: hostSession.userId,
      isConnected: hostSession.isConnected,
      username: hostSession.username,
    }

    // contestants
    const contestants = contestantStore.getByGameId(gameId)

    res.json({ contestants, game, host })
  })

  app.post('/api/games/:gameId/join', (req, res) => {
    console.log('POST /api/games/:gameId/join')
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
    console.log({ gameId, role, userId })
    if (role === 'contestant') {
      contestantStore.new(gameId, userId)
      res.status(200).send()
      return
    }
  })
}
