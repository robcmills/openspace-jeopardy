import { useCallback, useEffect } from 'react'
import { GameState } from './GameState'
import { revealTiles } from './revealTiles'
import { resetTiles } from './resetTiles'
import { zoomInCategories, zoomOutCategories } from './zoomCategories'
import { panCategories } from './panCategories'
import { getNextGameState } from './getNextGameState'
import { useGameState } from './useGameState'
import { getPreviousGameState } from './getPreviousGameState'
import { useIsHost } from './useIsHost'
import { socket } from './socket'
import { useAtomValue } from 'jotai'
import { gameAtom } from './gameAtom'

const SPACE_KEY_CODE = 32

export function useGameKeyBindings() {
  const { gameState, setGameState } = useGameState()
  const game = useAtomValue(gameAtom)
  const isHost = useIsHost()

  const handleKeyDown = useCallback((event: KeyboardEvent) => {
    event.preventDefault()
    console.log(event.key, event.keyCode)
    if (event.key === 'r') {
      window.location.reload()
    } else if (event.key === 'n') {
      resetTiles()
      const nextGameState = getNextGameState(gameState)
      setGameState(nextGameState)
      socket.emit('setGameState', {
        gameId: game.id,
        gameState: nextGameState,
      })
    } else if (event.key === 'p') {
      resetTiles()
      const previousGameState = getPreviousGameState(gameState)
      setGameState(previousGameState)
      socket.emit('setGameState', {
        gameId: game.id,
        gameState: previousGameState,
      })
    } else if (
      event.keyCode === SPACE_KEY_CODE &&
      [GameState.Jeopardy, GameState.DoubleJeopardy]
        .includes(gameState)
    ) {
      revealTiles()
      socket.emit('revealTiles', { gameId: game.id })
    } else if (event.key === 'c') {
      zoomInCategories()
      socket.emit('zoomCategories', { direction: 'in', gameId: game.id })
    } else if (event.key === 'C') {
      zoomOutCategories()
      socket.emit('zoomCategories', { direction: 'out', gameId: game.id })
    } else if (event.key === 'ArrowRight') {
      panCategories()
      socket.emit('panCategories', { gameId: game.id })
    }
  }, [game, gameState])

  useEffect(() => {
    if (!isHost) return
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown, isHost])
}
