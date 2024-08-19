import type { Contestant } from './Contestant'
import { randomId } from './randomId'

export const contestantStore = {
  contestantsById: new Map<string, Contestant>(),
  indexByGameId: new Map<string, Set<string>>(),

  new(gameId: string, userId: string): Contestant {
    const contestant: Contestant = {
      gameId,
      id: randomId(),
      question: '',
      score: 0,
      userId,
      wager: -1,
    }
    this.set(contestant)
    return contestant
  },

  getByGameId(gameId: string) {
    const contestantIds = this.indexByGameId.get(gameId)
    if (!contestantIds) return []
    return [...contestantIds]
      .map((id) => this.contestantsById.get(id))
      .filter((contestant): contestant is Contestant => Boolean(contestant))
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
