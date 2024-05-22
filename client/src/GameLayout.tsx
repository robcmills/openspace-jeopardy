import { CSSProperties } from 'react';
import { Side } from './Side';
import { absoluteFill } from './styles';
import { Game } from './Game';

export function GameLayout() {
  const containerStyle: CSSProperties = {
    ...absoluteFill,
    // placeContent: 'center',
    // placeItems: 'center',
    display: 'grid',
    gridTemplateColumns: '2fr 1fr',
  }

  return (
    <div style={containerStyle}>
      <Game />
      <Side />
    </div>
  )
}
