import { GameState } from './GameState';

export function isGameState(gameState?: string): gameState is GameState {
  return Object.values(GameState).includes(gameState as GameState)
}
