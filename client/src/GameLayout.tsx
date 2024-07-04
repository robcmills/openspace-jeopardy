import { CSSProperties } from 'react'
import { absoluteFill } from './styles'
import { useScreenOrientation } from './useScreenOrientation'

const leftStyle: CSSProperties = {
  display: 'grid',
  placeItems: 'center',
  overflow: 'hidden',
  padding: 8,
  position: 'relative',
}

interface GameLayoutProps {
  left: React.ReactNode;
  right: React.ReactNode;
}

export function GameLayout({ left, right }: GameLayoutProps) {
  const { isPortrait } = useScreenOrientation()

  const containerStyle: CSSProperties = {
    ...absoluteFill,
    display: 'grid',
    ...(isPortrait
      ? { gridTemplateRows: '1fr 2fr' }
      : { gridTemplateColumns: '2fr 1fr' }
    ),
  }

  const rightStyle: CSSProperties = {
    display: 'grid',
    overflow: 'hidden',
    ...(isPortrait
      ? { borderTop: '1px solid lightgray' }
      : { borderLeft: '1px solid lightgray' }
    ),
  }

  return (
    <div style={containerStyle}>
      <div id='left' style={leftStyle}>
        {left}
      </div>
      <div id='right' style={rightStyle}>
        {right}
      </div>
    </div>
  )
}
