import { CSSProperties } from 'react'
import { useIsAnyClueVisible } from './useIsAnyClueVisible'
import { useAtomValue } from 'jotai'
import { activeContestantAtom } from './activeContestantAtom'
import { addToContestantScore } from './addToContestantScore'
import { closeActiveClue } from './closeActiveClue'

const controlsStyle: CSSProperties = {
  borderTop: '1px solid white',
  display: 'grid',
  gap: 16,
  gridAutoFlow: 'column',
  justifyContent: 'center',
  padding: 16,
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
  const activeContestantId = useAtomValue(activeContestantAtom)
  const isAnyClueVisible = useIsAnyClueVisible()
  if (!isAnyClueVisible || !activeContestantId) return null

  const onClickCorrect = () => {
    addToContestantScore(1)
    closeActiveClue()
  }

  const onClickIncorrect = () => {
    addToContestantScore(-1)
    closeActiveClue()
  }

  return (
    <div style={controlsStyle}>
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
  )
}
