import type { ClientGame } from './ClientGame'
import type { GameState } from './GameState'
import { getGameStates } from './getGameStates'

export function getPreviousGameState(
  gameState: GameState,
  game: ClientGame,
): GameState {
  const gameStates = getGameStates(game)
  const index = gameStates.indexOf(gameState)
  if (index < 0) return gameState
  const previousIndex = Math.max(index - 1, 0)
  return gameStates[previousIndex]
}
