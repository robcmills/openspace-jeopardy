import { GameState } from './GameState'
import type { Round } from './Round'

const ROUND_GAME_STATES: Record<Round, GameState> = {
  1: GameState.Jeopardy,
  2: GameState.DoubleJeopardy,
  3: GameState.TripleJeopardy,
}

export function getGameStateForRound(round: Round) {
  return ROUND_GAME_STATES[round]
}

export function getRoundForGameState(gameState: GameState): Round | null {
  if (gameState === GameState.Jeopardy) return 1
  if (gameState === GameState.DoubleJeopardy) return 2
  if (gameState === GameState.TripleJeopardy) return 3
  return null
}

export function isBoardGameState(gameState: GameState) {
  return getRoundForGameState(gameState) !== null
}
