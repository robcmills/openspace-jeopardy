import {
  CSSProperties,
  ChangeEventHandler,
  FormEventHandler,
  useEffect,
  useState,
} from 'react'
import { useSetContestant } from './useSetContestant'
import { useAtomValue, useSetAtom } from 'jotai'
import { gameAtom } from './gameAtom'
import { socket } from './socket'
import { revealDailyDoubleClue } from './revealDailyDoubleClue'
import { useGameState } from './useGameState'
import { GameState } from './GameState'
import { finalJeopardyAtom } from './finalJeopardyAtom'
import { ServerToClientEvents } from '../../server/socket-types'
import { Contestant } from '../../server/Contestant'
import { getActiveCategory } from './getActiveCategory'

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

type ContestantWagerFormProps = {
  contestant: Contestant
}

export function ContestantWagerForm({ contestant }: ContestantWagerFormProps) {
  const activeCategory = getActiveCategory()
  const setContestant = useSetContestant()
  const game = useAtomValue(gameAtom)
  const { gameState } = useGameState()
  const setFinalJeopardyState = useSetAtom(finalJeopardyAtom)

  const [question, setQuestion] = useState(contestant.question || '')
  const [wager, setWager] = useState(contestant.wager)

  const disabled = contestant.wager >= 0

  const onChangeQuestion: ChangeEventHandler<HTMLTextAreaElement> = (event) => {
    setQuestion(event.target.value)
  }

  const onChangeWager: ChangeEventHandler<HTMLInputElement> = (event) => {
    setWager(event.target.valueAsNumber)
  }

  const submit = () => {
    const submitWager = wager < 0 ? 0 : wager

    setContestant({ id: contestant.id, wager: submitWager })
    socket.emit('setContestantWager', {
      contestantId: contestant.id,
      gameId: game.id,
      wager: submitWager,
    })

    if (gameState === GameState.FinalJeopardy) {
      // Final Jeopardy
      setContestant({ id: contestant.id, question })
      socket.emit('setContestantQuestion', {
        contestantId: contestant.id,
        gameId: game.id,
        question,
      })
    } else {
      // Daily Double
      const location = revealDailyDoubleClue()
      if (!location) return
      socket.emit('cycleTileState', {
        column: location.column,
        gameId: game.id,
        row: location.row,
      })
    }
  }

  const onSubmit: FormEventHandler = (event) => {
    event.preventDefault()
    submit()
  }

  useEffect(() => {
    // Server will transition finalJeopardyState when 30 second audio ends.
    // At this point all contestants should have submitted their questions
    // and wagers, and if not we force submission.
    const callback: ServerToClientEvents['setFinalJeopardyState'] = ({
      state,
    }) => {
      if (state.step === 'logo') {
        submit()
        setFinalJeopardyState((prev) => ({ ...prev, step: 'logo' }))
      }
    }

    // Listen to socket event here so we can submit local form state
    socket.on('setFinalJeopardyState', callback)
    return () => {
      socket.off('setFinalJeopardyState', callback)
    }
  }, [submit])

  const questionInput =
    gameState === GameState.FinalJeopardy ? (
      <textarea
        disabled={disabled}
        onChange={onChangeQuestion}
        placeholder="Question"
        required
        value={question}
      />
    ) : null

  const max = Math.max(contestant.score, 100)

  return (
    <form onSubmit={onSubmit}>
      <div style={containerStyle}>
        <p>
          Category: <i>{activeCategory}</i>
        </p>
        {questionInput}
        <div style={wagerContainerStyle}>
          <input
            disabled={disabled}
            max={max}
            min={0}
            onChange={onChangeWager}
            placeholder="Wager"
            required
            style={{ width: 'calc(100% - 8px)' }}
            type="number"
            value={wager >= 0 ? wager : ''}
          />
          <button disabled={disabled} type="submit">
            Submit
          </button>
        </div>
      </div>
    </form>
  )
}
