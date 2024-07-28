import { useAtomValue } from 'jotai'
import { tilesAtoms } from './tilesAtoms'

export function useIsDailyDouble() {
  const tileStates = tilesAtoms.flat().map((tileAtom) => useAtomValue(tileAtom))
  return tileStates.some((tileState) => tileState.step === 'dailyDouble')
}
