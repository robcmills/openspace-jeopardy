import { CSSProperties } from 'react'

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

export function HostControls() {
  return (
    <div style={controlsStyle}>
      <button style={buttonStyle} title='<spacebar>'></button>
    </div>
  )
}
