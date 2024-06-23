import { PrimitiveAtom, atom } from 'jotai'
import { TileState } from './TileState';

export const initialTileState: TileState = {
  step: 'logo',
  isDailyDouble: false,
  answer: '',
}

export const tilesAtoms: PrimitiveAtom<TileState>[][] = []

for (let columnIndex = 0; columnIndex < 6; columnIndex++) {
  const column: PrimitiveAtom<TileState>[] = [];
  for (let rowIndex = 0; rowIndex < 5; rowIndex++) {
    column.push(atom(initialTileState))
  }
  tilesAtoms.push(column)
}
