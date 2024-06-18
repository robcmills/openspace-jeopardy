import { CSSProperties } from 'react'
import { useIsAnyClueVisible } from './useIsAnyClueVisible'
import { addToContestantScore } from './addToContestantScore'
import { closeActiveClue } from './closeActiveClue'
import { useActiveContestant } from './useActiveContestant'
import { useAtomValue } from 'jotai'
import { gameAtom } from './gameAtom'
import { setContestant } from './setContestant'
import { socket } from './socket'

const controlsStyle: CSSProperties = {
  borderTop: '1px solid white',
  display: 'grid',
  gap: 16,
  gridTemplateRows: 'auto auto',
  justifyContent: 'center',
  padding: 16,
  placeItems: 'center',
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
  if (!isAnyClueVisible || !activeContestant) return null

  const resetContestantWager = () => {
    if (!activeContestant.contestant.wager) return
    setContestant({ id: activeContestant.contestant.id, wager: 0 })
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

  const wager = activeContestant.contestant.wager
    ? <p>Wager: ${activeContestant.contestant.wager.toLocaleString()}</p>
    : null

  controlsStyle.gap = wager ? 16 : 0

  return (
    <div style={controlsStyle}>
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
