import { useCallback, useEffect } from 'react'
import { GameState } from './GameState'
import { revealTiles } from './revealTiles'
import { resetTiles } from './resetTiles';
import fill from './assets/board-fill.mp3'
import { zoomInCategories, zoomOutCategories } from './zoomCategories';
import { panCategories } from './panCategories';
import { useSetGameState } from './useSetGameState';
import { getNextGameState } from './getNextGameState';
import { useGameState } from './useGameState';
import { getPreviousGameState } from './getPreviousGameState';

const SPACE_KEY_CODE = 32

const audio = new Audio(fill);

export function useGameKeyBindings() {
  const gameState = useGameState()
  const { setGameState } = useSetGameState()

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    event.preventDefault()
    console.log(event.key, event.keyCode)
    if (event.key === 'n') {
      resetTiles()
      setGameState(getNextGameState(gameState))
    } else if (event.key === 'p') {
      resetTiles()
      setGameState(getPreviousGameState(gameState))
    } else if (
      event.keyCode === SPACE_KEY_CODE &&
      [GameState.Jeopardy, GameState.FinalJeopardy]
        .includes(gameState)
    ) {
      audio.play()
      revealTiles()
    } else if (event.key === 'c') {
      zoomInCategories()
    } else if (event.key === 'C') {
      zoomOutCategories()
    } else if (event.key === 'ArrowRight') {
      panCategories()
    }
  }, [gameState])

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])
}
