import { jotaiStore } from './jotaiStore';
import { TileState, tilesAtoms } from './tilesAtoms';

export function resetTiles() {
  for (const atom of tilesAtoms.flat()) {
    jotaiStore.set(atom, 'logo' as TileState)
  }
}
