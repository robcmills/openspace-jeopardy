import { contestantsAtom } from './contestantsAtom'
import { Contestant } from '../../server/Contestant'
import { jotaiStore } from './jotaiStore'

export type SetContestant = Partial<Contestant> & Pick<Contestant, 'id'>

export function setContestant(contestant: SetContestant) {
  jotaiStore.set(contestantsAtom, (prev) => ({
    ...prev,
    contestantsById: {
      ...prev.contestantsById,
      [contestant.id]: {
        ...prev.contestantsById[contestant.id],
        ...contestant,
      },
    },
  }))
}
