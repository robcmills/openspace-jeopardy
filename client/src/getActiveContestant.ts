import { activeContestantAtom } from './activeContestantAtom'
import { contestantsAtom } from './contestantsAtom'
import { jotaiStore } from './jotaiStore'

export function getActiveContestant() {
  const activeContestantId = jotaiStore.get(activeContestantAtom)
  if (!activeContestantId) return null
  const { contestantsById } = jotaiStore.get(contestantsAtom)
  return contestantsById[activeContestantId] || null
}
