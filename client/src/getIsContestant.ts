import { gameAtom } from './gameAtom'
import { socketAtom } from './socketAtom'
import { contestantsAtom } from './contestantsAtom'
import { jotaiStore } from './jotaiStore'

export function getIsContestant() {
  const game = jotaiStore.get(gameAtom)
  const { userId } = jotaiStore.get(socketAtom)
  const { contestantsById } = jotaiStore.get(contestantsAtom)
  return Object.values(contestantsById)
    .filter(contestant => contestant.gameId === game.id)
    .some(contestant => contestant.userId === userId)
}
