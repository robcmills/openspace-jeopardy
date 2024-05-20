import { GameState } from '../client/src/GameState';
import type { Game } from './Game';
import { randomId } from './randomId';

export const gameStore = {
  gamesById: new Map<string, Game>(),
  indexByHostUserId: new Map<string, string>(),

  new({ hostUserId, name }): Game {
    const newGame: Game = {
      id: randomId(),
      hostUserId,
      name,
      state: GameState.Intro,
    }
    this.set(newGame)
    return newGame
  },

  getAll() {
    return [...this.gamesById.values()]
  },

  getByHostUserId(hostUserId: string) {
    const gameId = this.indexByHostUserId.get(hostUserId)
    return gameId ? this.gamesById.get(gameId) || null : null
  },

  getById(id: string) {
    return this.gamesById.get(id)
  },

  set(game: Game) {
    this.gamesById.set(game.id, game)
    this.indexByHostUserId.set(game.hostUserId, game.id)
  },
}
