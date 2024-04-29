import { CategoryTile } from './CategoryTile';
import { Round } from './Round';
import { Tile } from './Tile';
import { jeopardy } from './clues'

interface ColumnProps {
  column: typeof jeopardy[0];
  index: number;
  round: Round;
}

export function Column({ column, index, round }: ColumnProps) {
  const tiles = column.items.map((item, row) => 
    <Tile column={index} key={`${index}-${row}`} row={row} item={item} round={round} />)

  return (
    <div className='column'>
      <CategoryTile category={column.category} />
      {tiles}
    </div>
  )
}
