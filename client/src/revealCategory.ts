import { categoriesAtoms } from './categoriesAtoms';
import { jotaiStore } from './jotaiStore';

export function revealCategory(column: number) {
  const tileStateAtom = categoriesAtoms[column]
  const state = jotaiStore.get(tileStateAtom)
  jotaiStore.set(tileStateAtom, (prev) => ({
    ...prev,
    step: state.step === 'logo' ? 'category' : 'logo',
  }))
}
