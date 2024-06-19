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
import { useGameState } from './useGameState'
import { GameState } from './GameState'

const containerStyle: CSSProperties = {
  borderTop: '1px solid white',
  display: 'grid',
  gap: 6,
  padding: 16,
}

const wagerContainerStyle: CSSProperties = {
  display: 'grid',
  gap: 6,
  gridTemplateColumns: '1fr 1fr',
}

export function ContestantWagerForm() {
  const contestant = useContestant()
  const setContestant = useSetContestant()
  const game = useAtomValue(gameAtom)
  const { gameState } = useGameState()

  const [question, setQuestion] = useState(
    contestant?.contestant.question || ''
  )
  const [wager, setWager] = useState<number | string>(
    contestant?.contestant.wager || ''
  )

  if (!contestant) return null
  const disabled = contestant.contestant.wager > 0

  const onChangeQuestion: ChangeEventHandler<HTMLTextAreaElement> = (event) => {
    setQuestion(event.target.value)
  }

  const onChangeWager: ChangeEventHandler<HTMLInputElement> = (event) => {
    setWager(event.target.value ? event.target.valueAsNumber : '')
  }

  const onSubmit: FormEventHandler = (event) => {
    event.preventDefault()
    if (typeof wager !== 'number') return

    setContestant({ id: contestant.contestant.id, wager })
    socket.emit('setContestantWager', {
      contestantId: contestant.contestant.id,
      gameId: game.id,
      wager,
    })

    if (gameState === GameState.FinalJeopardy) {
      // Final Jeopardy
      setContestant({ id: contestant.contestant.id, question })
      socket.emit('setContestantQuestion', {
        contestantId: contestant.contestant.id,
        gameId: game.id,
        question,
      })
    } else {
      // Daily Double
      const location = revealDailyDoubleClue()
      if (!location) return
      socket.emit('setTileState', {
        column: location.column,
        gameId: game.id,
        row: location.row,
        state: 'answer',
      })
    }
  }

  return (
    <form onSubmit={onSubmit}>
      <div style={containerStyle}>
        <textarea
          disabled={disabled}
          onChange={onChangeQuestion}
          placeholder='Question'
          required
          value={question}
        />
        <div style={wagerContainerStyle}>
          <input
            disabled={disabled}
            max={contestant?.contestant.score || 100}
            min={100}
            onChange={onChangeWager}
            placeholder='Wager'
            required
            style={{ width: 'calc(100% - 8px)' }}
            type='number'
            value={wager}
          />
          <button disabled={disabled} type='submit'>Submit</button>
        </div>
      </div>
    </form>
  )
}
