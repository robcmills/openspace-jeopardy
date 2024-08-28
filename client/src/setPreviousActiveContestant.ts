import { jotaiStore } from './jotaiStore'
import { previousActiveContestantAtom } from './previousActiveContestantAtom'

export function setPreviousActiveContestant(contestantId: string) {
  jotaiStore.set(previousActiveContestantAtom, contestantId)
}
