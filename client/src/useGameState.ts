import { useParams } from 'react-router-dom';
import { GameState } from './GameState';
import { isGameState } from './isGameState';
import { getGamePath } from './getGamePath';
import { navigate } from './navigate';

export function useGameState() {
  const { gameId, gameState } = useParams()
  const setGameState = (gameState: GameState) => {
    if (gameId) navigate.to(getGamePath(gameId, gameState))
  }
  return {
    gameState: isGameState(gameState) ? gameState : GameState.Intro,
    setGameState,
  } as const
}
