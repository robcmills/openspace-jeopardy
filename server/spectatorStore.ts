import type { UserState } from '../client/src/UserState';
import type { Spectator } from './Spectator';
import type { Session } from './Session';
import { randomId } from './randomId';
import { sessionStore } from './sessionStore';

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
      .map(id => this.spectatorsById.get(id))
      .filter((spectator): spectator is Spectator => Boolean(spectator))
      .map(spectator => sessionStore.getByUserId(spectator?.userId || ''))
      .filter((session): session is Session => Boolean(session))
      .map(session => {
        const user: UserState = {
          isConnected: session.isConnected,
          username: session.username,
          id: session.userId,
        }
        return user
      })
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
