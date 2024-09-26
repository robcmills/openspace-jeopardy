import { useAtomValue } from 'jotai'
import { activeContestantAtom } from './activeContestantAtom'
import { timerAtom } from './timerAtom'

export function useIsHostTimerActive() {
  const activeContestantId = useAtomValue(activeContestantAtom)
  const timerValue = useAtomValue(timerAtom)
  return activeContestantId === null && timerValue > 0
}
