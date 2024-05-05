import { CategoryTile } from './CategoryTile';
import { Round } from './Round';
import { Tile } from './Tile';
import { jeopardy } from './clues'
import { columnCount, tileAspect, tileGap, xgaps } from './constants';

interface ColumnProps {
  boardWidth: number;
  column: typeof jeopardy[0];
  index: number;
  round: Round;
}

export function Column({ boardWidth, column, index, round }: ColumnProps) {
  const tileWidth = (boardWidth - xgaps) / columnCount
  const tileHeight = tileWidth / tileAspect

  const tiles = column.items.map((item, row) => 
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

  return (
    <div className='column' style={{ gap: tileGap }}>
      <CategoryTile category={column.category} height={tileHeight} width={tileWidth} />
      {tiles}
    </div>
  )
}
