import type { Express } from 'express';
import { gameStore } from './gameStore';

export function useApiEndpoints(app: Express) {
  app.get('/api/games/:gameId', (req, res) => {
    const gameId = req.params.gameId;
    const game = gameStore.getById(gameId);
    if (game) {
      res.json(game);
    } else {
      res.status(404).json({ error: 'Game not found' });
    }
  })
}
