import { GameState } from '../client/src/GameState'
import type { ServerGame } from './ServerGame'
import { getEpisodeRounds } from './getEpisodeRounds'
import { initialTilesState } from './TilesState'
import { randomId } from './randomId'

export const gameStore = {
  gamesById: new Map<string, ServerGame>(),
  indexByHostUserId: new Map<string, string>(),

  new(episodeId: string, hostUserId: string, name: string): ServerGame {
    const { hasFinalJeopardy, rounds } = getEpisodeRounds(episodeId)
    const newGame: ServerGame = {
      activeContestantId: null,
      categories: Array(6).fill({ category: '', step: 'logo' }),
      episodeId,
      finalJeopardy: { answer: '', category: '', step: 'logo' },
      hasFinalJeopardy,
      id: randomId(),
      hostUserId,
      name,
      previousActiveContestantId: null,
      rounds,
      state: GameState.Lobby,
      tiles: initialTilesState,
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

  set(game: ServerGame) {
    this.gamesById.set(game.id, game)
    this.indexByHostUserId.set(game.hostUserId, game.id)
  },
}
