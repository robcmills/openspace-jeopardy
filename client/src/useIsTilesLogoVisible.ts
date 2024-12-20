import { tilesAtoms } from './tilesAtoms'
import { useAtomValue } from 'jotai'

export function useIsTilesLogoVisible() {
  const tileStates = tilesAtoms.flat().map((tileAtom) => useAtomValue(tileAtom))
  return tileStates.every((tileState) => tileState.step === 'logo')
}
