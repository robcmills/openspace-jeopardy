import { tilesAtoms } from './tilesAtoms'
import { useAtomValue } from 'jotai'

export function useIsAnyClueVisible() {
  const tileStates = tilesAtoms.flat().map((tileAtom) => useAtomValue(tileAtom))
  return tileStates.some((tileState) => tileState.step === 'answer')
}
