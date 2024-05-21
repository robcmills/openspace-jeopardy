import { useCallback, useEffect } from 'react'
import { GameState } from './GameState'
import { revealTiles } from './revealTiles'
import { resetTiles } from './resetTiles';
import fill from './assets/board-fill.mp3'
import { zoomInCategories, zoomOutCategories } from './zoomCategories';
import { panCategories } from './panCategories';
import { useAtomValue } from 'jotai';
import { gameAtom } from './gameAtom';
import { useSetGameState } from './useSetGameState';

const SPACE_KEY_CODE = 32

const audio = new Audio(fill);

export function useKeyBindings() {
  const game = useAtomValue(gameAtom)
  const { setGameState } = useSetGameState()

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    event.preventDefault()
    console.log(event.key, event.keyCode)
    if (event.key === 'n') {
      resetTiles()
      setGameState(Math.min(game.state + 1, Object.keys(GameState).length / 2 - 1))
    } else if (event.key === 'p') {
      resetTiles()
      setGameState(Math.max(game.state - 1, 0))
    } else if (
      event.keyCode === SPACE_KEY_CODE &&
      [GameState.Jeopardy, GameState.FinalJeopardy]
        .includes(game.state)
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
  }, [game.state])

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])
}
