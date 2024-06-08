import { GameState } from './GameState';

export function getGamePath(
  gameId: string,
  gameState: GameState = GameState.Lobby
) {
  return `/games/${gameId}/${gameState}`
}
