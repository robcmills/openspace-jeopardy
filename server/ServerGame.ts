import type { CategoryTileState } from '../client/src/CategoryTileState'
import type { FinalJeopardyState } from '../client/src/FinalJeopardyState'
import type { GameState } from '../client/src/GameState'
import type { TilesState } from './TilesState'

export type ServerGame = {
  activeContestantId: string | null
  categories: CategoryTileState[]
  finalJeopardy: FinalJeopardyState
  id: string
  hostUserId: string
  name: string
  state: GameState
  tiles: TilesState
}
