import { useAtomValue } from 'jotai'
import { gameAtom } from './gameAtom'
import { GameState } from './GameState'
import { getNextGameState } from './getNextGameState'
import { setActiveContestant } from './setActiveContestant'
import { socket } from './socket'
import { useGameState } from './useGameState'
import { getPreviousGameState } from './getPreviousGameState'
import { resetTiles } from './resetTiles'

export function useCycleGameState() {
  const { gameState, setGameState } = useGameState()
  const game = useAtomValue(gameAtom)

  return (direction: 'next' | 'previous') => {
    if (direction === 'next') {
      socket.emit('resetTiles', { gameId: game.id })
      const nextGameState = getNextGameState(gameState)
      setGameState(nextGameState)
      if (nextGameState === GameState.FinalJeopardy) {
        setActiveContestant(null)
      }
    } else {
      resetTiles()
      socket.emit('resetTiles', { gameId: game.id })
      const previousGameState = getPreviousGameState(gameState)
      setGameState(previousGameState)
    }
  }
}
