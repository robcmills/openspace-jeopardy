import type { CategoryTileState } from '../client/src/CategoryTileState'
import type { FinalJeopardyState } from '../client/src/FinalJeopardyState'
import type { GameState } from '../client/src/GameState'
import type { TilesState } from './TilesState'

export type ServerGame = {
  activeContestantId: string | null
  categories: CategoryTileState[]
  episodeId: string
  finalJeopardy: FinalJeopardyState
  id: string
  hostUserId: string
  name: string
  previousActiveContestantId: string | null
  state: GameState
  tiles: TilesState
}
