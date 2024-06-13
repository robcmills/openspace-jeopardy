import { CSSProperties } from 'react'
import { useIsContestant } from './useIsContestant'

const controlsStyle: CSSProperties = {
  borderTop: '1px solid white',
  display: 'grid',
  padding: 16,
  placeItems: 'center',
}

const buttonStyle: CSSProperties = {
  borderRadius: 32,
  cursor: 'pointer',
  height: 32,
  width: 64,
}

export function ContestantControls() {
  const isContestant = useIsContestant()
  if (!isContestant) return null
  return (
    <div style={controlsStyle}>
      <button style={buttonStyle} title='<spacebar>'></button>
    </div>
  )
}
