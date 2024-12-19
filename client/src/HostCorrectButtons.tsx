import { CSSProperties } from 'react'
import { GameState } from './GameState'
import { addToContestantScore } from './addToContestantScore'
import { clearTimer, restartTimer } from './timerActions'
import { closeActiveClue } from './closeActiveClue'
import { gameAtom } from './gameAtom'
import { getActiveClue } from './getActiveClue'
import { resetActiveContestantWager } from './resetActiveContestantWager'
import { setActiveContestant } from './setActiveContestant'
import { setPreviousActiveContestant } from './setPreviousActiveContestant'
import { socket } from './socket'
import { useActiveContestant } from './useActiveContestant'
import { useAtomValue } from 'jotai'
import { useGameState } from './useGameState'

const buttonsStyle: CSSProperties = {
  display: 'grid',
  gap: 16,
  gridAutoFlow: 'column',
  justifyContent: 'center',
  placeItems: 'center',
}

const buttonStyle: CSSProperties = {
  border: '1px solid',
  borderRadius: 16,
  cursor: 'pointer',
  fontWeight: 'bold',
  height: 32,
  width: 64,
}

export function HostCorrectButtons() {
  const game = useAtomValue(gameAtom)
  const { gameState } = useGameState()
  const activeContestant = useActiveContestant()

  if (!activeContestant) return null

  const onClickCorrect = () => {
    addToContestantScore(1)
    closeActiveClue()
    resetActiveContestantWager()
    clearTimer()
    socket.emit('clearTimer', { gameId: game.id })
    setPreviousActiveContestant(activeContestant.contestant.id)
    socket.emit('setPreviousActiveContestant', {
      contestantId: activeContestant.contestant.id,
      gameId: game.id,
    })
    if (gameState === GameState.FinalJeopardy) setActiveContestant(null)
  }

  const onClickIncorrect = () => {
    addToContestantScore(-1)
    resetActiveContestantWager()
    setActiveContestant(null)
    if (gameState === GameState.FinalJeopardy) return
    if (getActiveClue()?.isDailyDouble) {
      clearTimer()
      socket.emit('clearTimer', { gameId: game.id })
    } else {
      restartTimer()
      socket.emit('restartTimer', { gameId: game.id })
    }
  }

  return (
    <div style={buttonsStyle}>
      <button className="correct" onClick={onClickCorrect} style={buttonStyle}>
        ✓
      </button>
      <button
        className="incorrect"
        onClick={onClickIncorrect}
        style={buttonStyle}
      >
        ✗
      </button>
    </div>
  )
}
