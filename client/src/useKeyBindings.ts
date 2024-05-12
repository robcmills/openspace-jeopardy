import { useCallback, useEffect } from 'react'
import { GameState } from './GameState'
import { revealTiles } from './revealTiles'
import { resetTiles } from './resetTiles';
import fill from './assets/board-fill.mp3'
import { zoomInCategories, zoomOutCategories } from './zoomCategories';
import { panCategories } from './panCategories';

const audio = new Audio(fill);

interface UseKeyBindingsArgs {
  state: GameState;
  setState: (gameState: GameState) => void;
}

export function useKeyBindings({ state, setState }: UseKeyBindingsArgs) {
  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    event.preventDefault()
    console.log(event.key, event.keyCode)
    if (event.key === 'n') {
      resetTiles()
      setState(Math.min(state + 1, Object.keys(GameState).length / 2 - 1))
    } else if (event.key === 'p') {
      resetTiles()
      setState(Math.max(state - 1, 0))
    } else if (event.keyCode === 32) { // Space
      audio.play()
      revealTiles()
    } else if (event.key === 'c') {
      zoomInCategories()
    } else if (event.key === 'C') {
      zoomOutCategories()
    } else if (event.key === 'ArrowRight') {
      panCategories()
    }
  }, [state])

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])
}
