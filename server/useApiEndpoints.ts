import type { Express } from 'express'
import { gameStore } from './gameStore'
import { sessionStore } from './sessionStore'
import type { UserState } from '../client/src/UserState'

export function useApiEndpoints(app: Express) {
  app.get('/api/games/:gameId', (req, res) => {
    const gameId = req.params.gameId
    const game = gameStore.getById(gameId)
    if (!game) {
      res.status(404).json({ error: 'Game not found' })
      return
    }

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

    res.json({ game, host })
  })
}
