import { useAtomValue } from 'jotai'
import { CSSProperties, useCallback, useEffect, useState } from 'react'
import { LIGHT_GREEN } from './colors'
import { gameAtom } from './gameAtom'
import { socket } from './socket'
import { clearTimer } from './timerActions'
import { useContestantControlsSignal } from './useContestantControlsSignal'
import { useContestant } from './useContestant'

const SPACE_KEY_CODE = 32

const buzzerContainerStyle: CSSProperties = {
  borderTop: '1px solid white',
  display: 'grid',
  padding: 16,
  placeItems: 'center',
  position: 'relative',
}

export function ContestantBuzzer() {
  const contestant = useContestant()
  const { color } = useContestantControlsSignal()
  const game = useAtomValue(gameAtom)
  const [disabled, setDisabled] = useState(false)

  const buzzer = useCallback(() => {
    if (color !== LIGHT_GREEN) {
      // Penalize with 500ms lockout
      setDisabled(true)
      setTimeout(() => setDisabled(false), 500)
      return
    }
    if (!contestant) return
    const contestantId = contestant.contestant.id
    clearTimer()
    socket.emit('clearTimer', { gameId: game.id })
    socket.emit('contestantBuzzer', { contestantId, gameId: game.id })
  }, [color, contestant, game])

  const onPointerDown = () => {
    buzzer()
  }

  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      event.preventDefault()
      if (event.keyCode === SPACE_KEY_CODE) buzzer()
    },
    [buzzer],
  )

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown)
    return () => document.removeEventListener('keydown', handleKeyDown)
  }, [handleKeyDown])

  const buttonStyle: CSSProperties = {
    backgroundColor: disabled ? 'red' : color,
    borderRadius: 25,
    cursor: 'pointer',
    height: 50,
    width: 50,
  }

  return (
    <div style={buzzerContainerStyle}>
      <button
        className="buzzer"
        disabled={disabled}
        onPointerDown={onPointerDown}
        style={buttonStyle}
        title="<spacebar>"
      />
    </div>
  )
}
