import { GameState } from './GameState';

export function getGamePath(
  gameId: string,
  gameState: GameState = GameState.Intro
) {
  return `/games/${gameId}/${gameState}`
}
