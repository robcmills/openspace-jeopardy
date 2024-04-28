import { useCallback, useEffect } from 'react'
import { GameState } from './GameState'
import { revealTiles } from './revealTiles'
import { resetTiles } from './resetTiles';

interface UseKeyBindingsArgs {
  state: GameState;
  setState: (gameState: GameState) => void;
}

export function useKeyBindings({ state, setState }: UseKeyBindingsArgs) {
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (event.key === 'n') {
      resetTiles()
      setState(Math.min(state + 1, Object.keys(GameState).length / 2 - 1))
    } else if (event.key === 'p') {
      resetTiles()
      setState(Math.max(state - 1, 0))
    } else if (event.keyCode === 32) { // Space
      revealTiles()
    }
  }, [state])

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])
}
