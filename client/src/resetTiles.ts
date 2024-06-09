import { CategoryTileState, categoriesAtoms } from './categoriesAtoms';
import { jotaiStore } from './jotaiStore';
import { TileState, tilesAtoms } from './tilesAtoms';

export function resetTiles() {
  for (const tileAtom of tilesAtoms.flat()) {
    jotaiStore.set(tileAtom, 'logo' as TileState)
  }

  for (const categoryAtom of categoriesAtoms) {
    jotaiStore.set(categoryAtom, 'logo' as CategoryTileState)
  }
}
