import type { GameState } from '../client/src/GameState'
import type { TilesState } from './TilesState'

export type ServerGame = {
  id: string,
  hostUserId: string,
  name: string,
  state: GameState,
  tiles: TilesState,
}
