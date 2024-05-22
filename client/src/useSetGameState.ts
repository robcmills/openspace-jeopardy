import { useParams } from 'react-router-dom'
import type { GameState } from './GameState'
import { getGamePath } from './getGamePath'
import { navigate } from './navigate'

export function useSetGameState() {
  const { gameId } = useParams()
  const setGameState = (gameState: GameState) => {
    if (gameId) navigate.to(getGamePath(gameId, gameState))
  }
  return { setGameState }
}
