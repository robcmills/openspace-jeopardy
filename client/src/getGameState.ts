import { matchPath } from 'react-router-dom';
import { isGameState } from './isGameState';
import { getGamePath } from './getGamePath';
import { GameState } from './GameState';

export function getGameState() {
  const match = matchPath(
    getGamePath(':gameId', ':gameState' as GameState),
    window.location.pathname
  ) 
  return isGameState(match?.params.gameState)
    ? match.params.gameState
    : null
}
