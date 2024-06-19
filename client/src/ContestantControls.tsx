import { CSSProperties, useState } from 'react'
import { useContestantControlsSignal } from './useContestantControlsSignal'
import { socket } from './socket'
import { useContestant } from './useContestant'
import { useAtomValue } from 'jotai'
import { gameAtom } from './gameAtom'
import { LIGHT_GREEN } from './colors'
import { ContestantWagerForm } from './ContestantWagerForm'
import { useIsDailyDouble } from './useIsDailyDouble'
import { useGameState } from './useGameState'
import { GameState } from './GameState'
import { finalJeopardyAtom } from './finalJeopardyAtom'

const buzzerContainerStyle: CSSProperties = {
  borderTop: '1px solid white',
  display: 'grid',
  padding: 16,
  placeItems: 'center',
  position: 'relative',
}

const lightContainerStyle: CSSProperties = {
  display: 'grid',
  placeItems: 'center',
  position: 'absolute',
  left: '50%',
  top: '50%',
}

const buttonStyle: CSSProperties = {
  borderRadius: 32,
  cursor: 'pointer',
  height: 32,
  width: 64,
}

export function ContestantControls() {
  const { color } = useContestantControlsSignal()
  const contestant = useContestant()
  const game = useAtomValue(gameAtom)
  const { gameState } = useGameState()
  const finalJeopardyState = useAtomValue(finalJeopardyAtom)

  const [disabled, setDisabled] = useState(false)

  const isDailyDouble = useIsDailyDouble()
  if (
    isDailyDouble ||
    contestant?.contestant.wager &&
    !contestant?.contestant.question
  ) {
    return <ContestantWagerForm />
  }

  if (gameState === GameState.FinalJeopardy) {
    if (finalJeopardyState === 'answer') {
      return <ContestantWagerForm />
    }
    return null
  }

  const lightStyle: CSSProperties = {
    backgroundColor: disabled ? 'red' : color,
    borderRadius: 8,
    height: 16,
    marginLeft: -96,
    transform: 'translate(-50%, -50%)',
    width: 16,
  }

  const onPointerDown = () => {
    if (color !== LIGHT_GREEN) {
      // Penalize with 500ms lockout
      setDisabled(true)
      setTimeout(() => setDisabled(false), 500)
      return
    }
    if (!contestant) return
    const contestantId = contestant.contestant.id
    socket.emit('contestantBuzzer', { contestantId, gameId: game.id })
  }

  return (
    <div style={buzzerContainerStyle}>
      <div style={lightContainerStyle}>
        <span style={lightStyle}></span>
      </div>
      <button
        className='buzzer'
        disabled={disabled}
        onPointerDown={onPointerDown}
        style={buttonStyle}
        title='<spacebar>'
      >
      </button>
    </div>
  )
}
