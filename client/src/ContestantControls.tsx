import { CSSProperties } from 'react'
import { useContestantControlsSignal } from './useContestantControlsSignal'

const controlsStyle: CSSProperties = {
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

  const lightStyle: CSSProperties = {
    backgroundColor: color,
    borderRadius: 8,
    height: 16,
    marginLeft: -96,
    transform: 'translate(-50%, -50%)',
    width: 16,
  }

  return (
    <div style={controlsStyle}>
      <div style={lightContainerStyle}>
        <span style={lightStyle}></span>
      </div>
      <button
        className='buzzer'
        style={buttonStyle}
        title='<spacebar>'
      >
      </button>
    </div>
  )
}
