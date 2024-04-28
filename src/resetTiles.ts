import { TileState, tilesAtoms, tilesStore } from './tilesAtoms';

export function resetTiles() {
  for (const atom of tilesAtoms.flat()) {
    tilesStore.set(atom, 'logo' as TileState)
  }
}
