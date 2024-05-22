import { GameState } from './GameState'

export function getNextGameState(gameState: GameState): GameState {
  const index = Object.values(GameState).indexOf(gameState)
  const nextIndex = Math.min(index + 1, Object.values(GameState).length - 1)
  return Object.values(GameState)[nextIndex]
}
