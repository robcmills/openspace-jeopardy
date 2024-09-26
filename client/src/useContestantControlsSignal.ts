import { useAtomValue } from 'jotai'
import { activeContestantAtom } from './activeContestantAtom'
import { useIsAnyClueVisible } from './useIsAnyClueVisible'
import { LIGHT_GREEN } from './colors'
import { useContestant } from './useContestant'
import { useIsHostTimerActive } from './useIsHostTimerActive'

export function useContestantControlsSignal() {
  const contestant = useContestant()
  const activeContestantId = useAtomValue(activeContestantAtom)
  const isAnyClueVisible = useIsAnyClueVisible()
  const isHostTimerActive = useIsHostTimerActive()

  const contestantId = contestant?.contestant.id
  const isActive = activeContestantId === contestantId

  let color = 'orange'
  if (isActive) {
    color = 'white'
  } else if (
    activeContestantId === null &&
    isAnyClueVisible &&
    isHostTimerActive
  ) {
    color = LIGHT_GREEN
  }

  return { color }
}
