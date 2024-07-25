import type { TileState } from '../client/src/TileState'
import { initialTileState } from '../client/src/tilesAtoms'

export type TilesState = TileState[][]

export const initialTilesState: TilesState = []

for (let columnIndex = 0; columnIndex < 6; columnIndex++) {
  const column: TileState[] = []
  for (let rowIndex = 0; rowIndex < 5; rowIndex++) {
    column.push(initialTileState)
  }
  initialTilesState.push(column)
}
