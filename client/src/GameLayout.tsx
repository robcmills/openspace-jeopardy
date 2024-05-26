import { CSSProperties } from 'react';
import { absoluteFill } from './styles';

interface GameLayoutProps {
  left: React.ReactNode;
  right: React.ReactNode;
}

export function GameLayout({ left, right }: GameLayoutProps) {
  const containerStyle: CSSProperties = {
    ...absoluteFill,
    display: 'grid',
    gridTemplateColumns: '2fr 1fr',
  }

  const leftStyle: CSSProperties = {
    display: 'grid',
    placeItems: 'center',
    position: 'relative',
  }

  return (
    <div style={containerStyle}>
      <div style={leftStyle}>
        {left}
      </div>
      <div style={{ borderLeft: '1px solid lightgray' }}>
        {right}
      </div>
    </div>
  )
}
