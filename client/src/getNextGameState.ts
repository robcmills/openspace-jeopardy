import type { ClientGame } from './ClientGame'
import type { GameState } from './GameState'
import { getGameStates } from './getGameStates'

export function getNextGameState(
  gameState: GameState,
  game: ClientGame,
): GameState {
  const gameStates = getGameStates(game)
  const index = gameStates.indexOf(gameState)
  if (index < 0) return gameState
  const nextIndex = Math.min(index + 1, gameStates.length - 1)
  return gameStates[nextIndex]
}
