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
import { activateRandomContestant } from './activateRandomContestant'
import { getRandomContestantId } from './getRandomContestantId'
import { setActiveContestant } from './setActiveContestant'
import { toggleTimer } from './toggleTimer'

const SPACE_KEY_CODE = 32

export function useHostKeyBindings() {
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
      socket.emit('resetTiles', { gameId: game.id })
      const nextGameState = getNextGameState(gameState)
      setGameState(nextGameState)
      if (nextGameState === GameState.FinalJeopardy) {
        setActiveContestant(null)
      }
    } else if (event.key === 'p') {
      resetTiles()
      const previousGameState = getPreviousGameState(gameState)
      setGameState(previousGameState)
    } else if (
      event.keyCode === SPACE_KEY_CODE &&
      [GameState.Jeopardy, GameState.DoubleJeopardy]
        .includes(gameState)
    ) {
      toggleTimer()
    } else if (
      event.key === 'v' &&
      [GameState.Jeopardy, GameState.DoubleJeopardy]
        .includes(gameState)
    ) {
      revealTiles()
      socket.emit('revealTiles', { gameId: game.id })
    } else if (
      event.key === 'a' && gameState === GameState.Jeopardy
    ) {
      const randomContestantId = getRandomContestantId()
      activateRandomContestant(randomContestantId)
      socket.emit('activateRandomContestant', {
        contestantId: randomContestantId,
        gameId: game.id,
      })
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
