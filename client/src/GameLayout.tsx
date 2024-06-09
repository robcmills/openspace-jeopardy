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
  position: 'relative',
}

const rightStyle: CSSProperties = {
  borderLeft: '1px solid lightgray'
}

interface GameLayoutProps {
  left: React.ReactNode;
  right: React.ReactNode;
}

export function GameLayout({ left, right }: GameLayoutProps) {
  return (
    <div style={containerStyle}>
      <div style={leftStyle}>
        {left}
      </div>
      <div style={rightStyle}>
        {right}
      </div>
    </div>
  )
}
