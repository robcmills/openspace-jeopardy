import { ReactNode } from 'react';
import { CategoryTile } from './CategoryTile';
import { Round } from './Round';
import { Tile } from './Tile';

const columnStyle = {
  display: 'grid',
  gridTemplateRows: 'repeat(6, 1fr)',
  placeContent: 'stretch',
  placeItems: 'stretch',
}

interface ColumnProps {
  index: number;
  round: Round;
}

export function Column({ index, round }: ColumnProps) {
  const clueTiles: ReactNode[] = []
  for (let row = 0; row < 5; row++) {
    clueTiles.push(
      <Tile
        column={index}
        key={`${index}-${row}`}
        round={round}
        row={row}
      />
    )
  }

  return (
    <div style={columnStyle}>
      <CategoryTile column={index} />
      {clueTiles}
    </div>
  )
}
