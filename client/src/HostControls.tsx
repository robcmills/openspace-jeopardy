import { CSSProperties } from 'react'
import { useIsAnyClueVisible } from './useIsAnyClueVisible'
import { addToContestantScore } from './addToContestantScore'
import { closeActiveClue } from './closeActiveClue'
import { useActiveContestant } from './useActiveContestant'
import { useAtomValue } from 'jotai'
import { gameAtom } from './gameAtom'
import { setContestant } from './setContestant'
import { socket } from './socket'
import { useGameState } from './useGameState'
import { GameState } from './GameState'

const controlsStyle: CSSProperties = {
  borderTop: '1px solid white',
  display: 'grid',
  gridTemplateRows: 'auto auto auto',
  justifyContent: 'center',
  padding: 16,
  placeItems: 'center',
  textAlign: 'center',
}

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

  const resetContestantWager = () => {
    if (!activeContestant.contestant.wager) return
    setContestant({
      id: activeContestant.contestant.id,
      question: '',
      wager: 0,
    })
    socket.emit('setContestantQuestion', {
      contestantId: activeContestant.contestant.id,
      gameId: game.id,
      question: '',
    })
    socket.emit('setContestantWager', {
      contestantId: activeContestant.contestant.id,
      gameId: game.id,
      wager: 0,
    })
  }

  const onClickCorrect = () => {
    addToContestantScore(1)
    closeActiveClue()
    resetContestantWager()
  }

  const onClickIncorrect = () => {
    addToContestantScore(-1)
    closeActiveClue()
    resetContestantWager()
  }

  const question = activeContestant.contestant.question
    ? <p>{activeContestant.contestant.question}</p>
    : null

  const wager = activeContestant.contestant.wager
    ? <p>Wager: ${activeContestant.contestant.wager.toLocaleString()}</p>
    : null

  controlsStyle.gap = wager ? 8 : 0

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
