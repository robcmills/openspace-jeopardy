import type { UserState } from '../client/src/UserState';
import type { Contestant } from './Contestant';
import type { Session } from './Session';
import { randomId } from './randomId';
import { sessionStore } from './sessionStore';

export const contestantStore = {
  contestantsById: new Map<string, Contestant>(),
  indexByGameId: new Map<string, Set<string>>(),

  new(gameId: string, userId: string): Contestant {
    const contestant: Contestant = {
      gameId,
      id: randomId(),
      userId,
    }
    this.set(contestant)
    return contestant
  },

  getByGameId(gameId: string) {
    const contestantIds = this.indexByGameId.get(gameId)
    if (!contestantIds) return []
    return [...contestantIds]
      .map(id => this.contestantsById.get(id))
      .filter((contestant): contestant is Contestant => Boolean(contestant))
      .map(contestant => sessionStore.getByUserId(contestant?.userId || ''))
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

  set(contestant: Contestant) {
    this.contestantsById.set(contestant.id, contestant)
    const contestantIds = this.indexByGameId.get(contestant.gameId)
    if (contestantIds) {
      contestantIds.add(contestant.id)
    } else {
      this.indexByGameId.set(contestant.gameId, new Set([contestant.id]))
    }
  },
}
