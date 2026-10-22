import type { CategoryTileState } from '../client/src/CategoryTileState'
import type { FinalJeopardyState } from '../client/src/FinalJeopardyState'
import type { GameState } from '../client/src/GameState'
import type { GameRound } from '../types/GameRound'
import type { TilesState } from './TilesState'

export type ServerGame = {
  activeContestantId: string | null
  categories: CategoryTileState[]
  episodeId: string
  finalJeopardy: FinalJeopardyState
  hasFinalJeopardy: boolean
  id: string
  hostUserId: string
  name: string
  previousActiveContestantId: string | null
  rounds: GameRound[]
  state: GameState
  tiles: TilesState
}
