import { CSSProperties } from 'react'
import { useIsAnyClueVisible } from './useIsAnyClueVisible'
import { addToContestantScore } from './addToContestantScore'
import { closeActiveClue } from './closeActiveClue'
import { useActiveContestant } from './useActiveContestant'
import { useAtomValue } from 'jotai'
import { gameAtom } from './gameAtom'
import { socket } from './socket'
import { useGameState } from './useGameState'
import { GameState } from './GameState'
import { setActiveContestant } from './setActiveContestant'
import { getActiveClue } from './getActiveClue'
import { clearTimer, restartTimer } from './timerActions'
import { resetActiveContestantWager } from './resetActiveContestantWager'

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

export function HostControls() {
  const game = useAtomValue(gameAtom)
  const activeContestant = useActiveContestant()
  const isAnyClueVisible = useIsAnyClueVisible()
  const { gameState } = useGameState()

  if (
    !activeContestant ||
    (!isAnyClueVisible && gameState !== GameState.FinalJeopardy) ||
    (gameState === GameState.FinalJeopardy && !activeContestant.contestant.wager)
  ) {
    return null
  }

  const onClickCorrect = () => {
    addToContestantScore(1)
    closeActiveClue()
    resetActiveContestantWager()
    clearTimer()
    socket.emit('clearTimer', { gameId: game.id })
    if (gameState === GameState.FinalJeopardy) setActiveContestant(null)
  }

  const onClickIncorrect = () => {
    addToContestantScore(-1)
    resetActiveContestantWager()
    if (getActiveClue()?.isDailyDouble) {
      closeActiveClue()
      clearTimer()
      socket.emit('clearTimer', { gameId: game.id })
    } else {
      setActiveContestant(null)
      if (gameState === GameState.FinalJeopardy) return
      restartTimer()
      socket.emit('restartTimer', { gameId: game.id })
    }
    if (gameState === GameState.FinalJeopardy) setActiveContestant(null)
  }

  const question = activeContestant.contestant.question
    ? <p>{activeContestant.contestant.question}</p>
    : null

  const wager = activeContestant.contestant.wager
    ? <p>Wager: ${activeContestant.contestant.wager.toLocaleString()}</p>
    : null


  const controlsStyle: CSSProperties = {
    borderTop: '1px solid white',
    display: 'grid',
    gap: wager ? 8 : 0,
    gridTemplateRows: 'auto auto auto',
    justifyContent: 'center',
    padding: 16,
    placeItems: 'center',
    textAlign: 'center',
  }

  // Ⅲ	3R	2162	8546	ROMAN NUMERAL THREE
  // ⅲ	3r	2172	8562	SMALL ROMAN NUMERAL THREE
  // ≡	=3	2261	8801	IDENTICAL TO

  return (
    <div style={controlsStyle}>
      {question}
      {wager}
      <div style={buttonsStyle}>
        <button
          className='correct'
          onClick={onClickCorrect}
          style={buttonStyle}
        >
          ✓
        </button>
        <button
          className='incorrect'
          onClick={onClickIncorrect}
          style={buttonStyle}
        >
          ✗
        </button>
      </div>
    </div>
  )
}
