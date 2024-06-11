import type { CategoryTileState } from '../client/src/CategoryTileState'
import type { GameState } from '../client/src/GameState'
import type { TilesState } from './TilesState'

export type ServerGame = {
  categories: CategoryTileState[],
  id: string,
  hostUserId: string,
  name: string,
  state: GameState,
  tiles: TilesState,
}
