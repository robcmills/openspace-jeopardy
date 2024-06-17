import { CSSProperties, FormEventHandler, useRef, useState } from 'react'
import { useContestant } from './useContestant'
import { useSetContestant } from './useSetContestant'
import { useAtomValue } from 'jotai'
import { gameAtom } from './gameAtom'
import { socket } from './socket'

const wagerContainerStyle: CSSProperties = {
  borderTop: '1px solid white',
  display: 'grid',
  gap: 6,
  gridTemplateColumns: '1fr 1fr',
  padding: 16,
}

export function ContestantWagerForm() {
  const contestant = useContestant()
  const setContestant = useSetContestant()
  const game = useAtomValue(gameAtom)
  const [disabled, setDisabled] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const onSubmitWager: FormEventHandler = (event) => {
    event.preventDefault()
    if (!contestant) return
    const input = inputRef.current
    if (!input) return
    const wager = input.valueAsNumber
    setDisabled(true)
    setContestant({ id: contestant.contestant.id, wager })
    socket.emit('setContestantWager', {
      contestantId: contestant.contestant.id,
      gameId: game.id,
      wager,
    })
    // revealDailyDoubleClue()
  }

  return (
    <form onSubmit={onSubmitWager}>
      <div style={wagerContainerStyle}>
        <input
          disabled={disabled}
          max={contestant?.contestant.score || 100}
          min={0}
          placeholder='Wager'
          ref={inputRef}
          required
          style={{ width: 'calc(100% - 8px)' }}
          type='number'
        />
        <button disabled={disabled} type='submit'>Submit</button>
      </div>
    </form>
  )
}
