import { useParams } from 'react-router-dom';
import { GameState } from './GameState';
import { isGameState } from './isGameState';
import { getGamePath } from './getGamePath';
import { navigate } from './navigate';
import { socket } from './socket';

export function useGameState() {
  const { gameId, gameState } = useParams()

  const setGameState = (gameState: GameState) => {
    if (!gameId) return
    socket.emit('setGameState', { gameId, gameState }, () => {
      navigate.to(getGamePath(gameId, gameState))
    })
  }

  return {
    gameState: isGameState(gameState) ? gameState : GameState.Lobby,
    setGameState,
  } as const
}
