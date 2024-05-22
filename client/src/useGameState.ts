import { useParams } from 'react-router-dom';
import { GameState } from './GameState';
import { isGameState } from './isGameState';

export function useGameState() {
  const { gameState } = useParams()
  return isGameState(gameState) ? gameState : GameState.Intro
}
