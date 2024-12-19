import { GameState } from './GameState'
import { activateRandomContestant } from './activateRandomContestant'
import { gameAtom } from './gameAtom'
import { getNextGameState } from './getNextGameState'
import { getPreviousGameState } from './getPreviousGameState'
import { getRandomContestantId } from './getRandomContestantId'
import { panCategories } from './panCategories'
import { resetTiles } from './resetTiles'
import { revealTiles } from './revealTiles'
import { setActiveContestant } from './setActiveContestant'
import { socket } from './socket'
import { toggleTimer } from './timerActions'
import { useAtomValue } from 'jotai'
import { useCallback, useEffect } from 'react'
import { useCycleGameState } from './useCycleGameState'
import { useGameState } from './useGameState'
import { useIsHost } from './useIsHost'
import { zoomInCategories, zoomOutCategories } from './zoomCategories'

const SPACE_KEY_CODE = 32

export function useHostKeyBindings() {
  const { gameState } = useGameState()
  const cycleGameState = useCycleGameState()
  const game = useAtomValue(gameAtom)
  const isHost = useIsHost()

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      event.preventDefault()
      console.log(event.key, event.keyCode)
      if (event.key === 'r') {
        window.location.reload()
      } else if (event.key === 'n') {
        cycleGameState('next')
      } else if (event.key === 'p') {
        cycleGameState('previous')
      } else if (
        event.keyCode === SPACE_KEY_CODE &&
        [GameState.Jeopardy, GameState.DoubleJeopardy].includes(gameState)
      ) {
        toggleTimer()
        socket.emit('toggleTimer', { gameId: game.id })
      } else if (
        event.key === 'v' &&
        [GameState.Jeopardy, GameState.DoubleJeopardy].includes(gameState)
      ) {
        revealTiles()
        socket.emit('revealTiles', { gameId: game.id })
      } else if (event.key === 'a' && gameState === GameState.Jeopardy) {
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
    },
    [game, gameState],
  )

  useEffect(() => {
    if (!isHost) return
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown, isHost])
}
