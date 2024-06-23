import { categoriesAtoms } from './categoriesAtoms';
import { jotaiStore } from './jotaiStore';
import { tilesAtoms } from './tilesAtoms';

export function resetTiles() {
  for (const tileAtom of tilesAtoms.flat()) {
    jotaiStore.set(tileAtom, (prev) => ({
      ...prev,
      step: 'logo',
    }))
  }

  for (const categoryAtom of categoriesAtoms) {
    jotaiStore.set(categoryAtom, (prev) => ({
      ...prev,
      step: 'logo',
    }))
  }
}
