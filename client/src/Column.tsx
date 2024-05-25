import { CategoryTile } from './CategoryTile';
import { Round } from './Round';
import { Tile } from './Tile';
import { jeopardy } from './clues'
import { columnCount, tileAspect } from './constants';

interface ColumnProps {
  boardWidth: number;
  column: typeof jeopardy[0];
  index: number;
  round: Round;
}

export function Column({ boardWidth, column, index, round }: ColumnProps) {
  const tileWidth = boardWidth / columnCount
  const tileHeight = tileWidth / tileAspect

  const categoryTile = (
    <CategoryTile
      category={column.category}
      height={tileHeight}
      width={tileWidth}
    />
  )

  const clueTiles = column.items.map((item, row) =>
    <Tile
      column={index}
      height={tileHeight}
      item={item}
      key={`${index}-${row}`}
      round={round}
      row={row}
      width={tileWidth}
    />
  )

  const columnStyle = {
    display: 'grid',
    placeItems: 'center',
  }

  return (
    <div style={columnStyle}>
      {false && categoryTile}
      {false && clueTiles}
    </div>
  )
}
