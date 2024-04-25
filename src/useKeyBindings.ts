import { useCallback, useEffect } from 'react';
import { GameState } from './GameState';

interface UseKeyBindingsArgs {
  state: GameState;
  setState: (gameState: GameState) => void;
}

export function useKeyBindings({ state, setState }: UseKeyBindingsArgs) {
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    if (event.key === 'n') {
      setState(Math.min(state + 1, Object.keys(GameState).length / 2 - 1))
    } else if (event.key === 'p') {
      setState(Math.max(state - 1, 0))
    }
  }, [state])

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])
}
