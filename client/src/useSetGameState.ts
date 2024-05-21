import { useAtom } from 'jotai'
import { gameAtom } from './gameAtom'
import { GameState } from './GameState'

export function useSetGameState() {
  const [game, setGame] = useAtom(gameAtom)
  const setGameState = (gameState: GameState) => {
    setGame({ ...game, state: gameState })
  }
  return { setGameState }
}
