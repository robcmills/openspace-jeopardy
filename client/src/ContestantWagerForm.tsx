import {
  CSSProperties,
  ChangeEventHandler,
  FormEventHandler,
  useState,
} from 'react'
import { useContestant } from './useContestant'
import { useSetContestant } from './useSetContestant'
import { useAtomValue } from 'jotai'
import { gameAtom } from './gameAtom'
import { socket } from './socket'
import { revealDailyDoubleClue } from './revealDailyDoubleClue'

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
  const [wager, setWager] = useState(contestant?.contestant.wager || 0)

  if (!contestant) return null
  const disabled = contestant.contestant.wager > 0

  const onChange: ChangeEventHandler<HTMLInputElement> = (event) => {
    setWager(event.target.valueAsNumber)
  }

  const onSubmitWager: FormEventHandler = (event) => {
    event.preventDefault()
    setContestant({ id: contestant.contestant.id, wager })
    socket.emit('setContestantWager', {
      contestantId: contestant.contestant.id,
      gameId: game.id,
      wager,
    })
    const location = revealDailyDoubleClue()
    if (!location) return
    socket.emit('setTileState', {
      column: location.column,
      gameId: game.id,
      row: location.row,
      state: 'answer',
    })
  }

  return (
    <form onSubmit={onSubmitWager}>
      <div style={wagerContainerStyle}>
        <input
          disabled={disabled}
          max={contestant?.contestant.score || 100}
          min={100}
          onChange={onChange}
          placeholder='Wager'
          required
          style={{ width: 'calc(100% - 8px)' }}
          type='number'
          value={wager}
        />
        <button disabled={disabled} type='submit'>Submit</button>
      </div>
    </form>
  )
}
