import { CSSProperties } from 'react';
import { absoluteFill } from './styles';

const containerStyle: CSSProperties = {
  ...absoluteFill,
  display: 'grid',
  gridTemplateColumns: '2fr 1fr',
}

const leftStyle: CSSProperties = {
  display: 'grid',
  placeItems: 'center',
  overflow: 'hidden',
  padding: 8,
  position: 'relative',
}

const rightStyle: CSSProperties = {
  borderLeft: '1px solid lightgray',
  display: 'grid',
  overflow: 'hidden',
}

interface GameLayoutProps {
  left: React.ReactNode;
  right: React.ReactNode;
}

export function GameLayout({ left, right }: GameLayoutProps) {
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
