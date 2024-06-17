import { useSetAtom } from 'jotai'
import { contestantsAtom } from './contestantsAtom'
import { Contestant } from '../../server/Contestant'

export type SetContestant = Partial<Contestant> & Pick<Contestant, 'id'>

export function useSetContestant() {
  const setContestants = useSetAtom(contestantsAtom)
  return (contestant: SetContestant) => setContestants((prev) => ({
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
