import { useAtomValue } from 'jotai'
import { tilesAtoms } from './tilesAtoms'

export function useActiveClue() {
  const tileStates = tilesAtoms.flat().map((tileAtom) => useAtomValue(tileAtom))
  return tileStates.find((tileState) => tileState.step === 'answer')
}
