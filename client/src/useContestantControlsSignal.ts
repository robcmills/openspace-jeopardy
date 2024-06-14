import { useAtomValue } from 'jotai'
import { activeContestantAtom } from './activeContestantAtom'
import { useIsAnyClueVisible } from './useIsAnyClueVisible'
import { LIGHT_GREEN } from './colors'

export function useContestantControlsSignal() {
  const activeContestantId = useAtomValue(activeContestantAtom)
  const isAnyClueVisible = useIsAnyClueVisible()
  let color = 'yellow'
  if (activeContestantId === null && isAnyClueVisible) {
    color = LIGHT_GREEN
  }
  return { color }
}
