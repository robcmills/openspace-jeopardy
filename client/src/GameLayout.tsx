import { CSSProperties, useState } from 'react';
import { absoluteFill } from './styles';

interface GameLayoutProps {
  left: (containerElement: HTMLElement | null) => React.ReactNode;
  right: React.ReactNode;
}

export function GameLayout({ left, right }: GameLayoutProps) {
  const [containerElement, setContainerElement] =
    useState<HTMLElement | null>(null)

  const containerStyle: CSSProperties = {
    ...absoluteFill,
    display: 'grid',
    gridTemplateColumns: '2fr 1fr',
  }

  const leftStyle: CSSProperties = {
    display: 'grid',
    placeItems: 'stretch',
  }

  return (
    <div style={containerStyle}>
      <div ref={(el) => setContainerElement(el)} style={leftStyle}>
        {left(containerElement)}
      </div>
      <div style={{ borderLeft: '1px solid lightgray' }}>
        {right}
      </div>
    </div>
  )
}
