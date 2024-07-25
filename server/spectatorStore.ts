import type { Spectator } from './Spectator'
import { randomId } from './randomId'

export const spectatorStore = {
  spectatorsById: new Map<string, Spectator>(),
  indexByGameId: new Map<string, Set<string>>(),

  new(gameId: string, userId: string): Spectator {
    const spectator: Spectator = {
      gameId,
      id: randomId(),
      userId,
    }
    this.set(spectator)
    return spectator
  },

  getByGameId(gameId: string) {
    const spectatorIds = this.indexByGameId.get(gameId)
    if (!spectatorIds) return []
    return [...spectatorIds]
      .map((id) => this.spectatorsById.get(id))
      .filter((spectator): spectator is Spectator => Boolean(spectator))
  },

  set(spectator: Spectator) {
    this.spectatorsById.set(spectator.id, spectator)
    const spectatorIds = this.indexByGameId.get(spectator.gameId)
    if (spectatorIds) {
      spectatorIds.add(spectator.id)
    } else {
      this.indexByGameId.set(spectator.gameId, new Set([spectator.id]))
    }
  },
}
