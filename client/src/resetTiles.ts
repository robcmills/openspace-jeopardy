import { categoriesAtoms, initialCategoryState } from './categoriesAtoms';
import { jotaiStore } from './jotaiStore';
import { initialTileState, tilesAtoms } from './tilesAtoms';

export function resetTiles() {
  console.log('resetTiles')
  for (const tileAtom of tilesAtoms.flat()) {
    jotaiStore.set(tileAtom, initialTileState)
  }

  for (const categoryAtom of categoriesAtoms) {
    jotaiStore.set(categoryAtom, initialCategoryState)
  }
}
