import { GameState } from './GameState'

export function getPreviousGameState(gameState: GameState): GameState {
  const index = Object.values(GameState).indexOf(gameState)
  const nextIndex = Math.max(index - 1, 0)
  return Object.values(GameState)[nextIndex]
}
