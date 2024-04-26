import { Round } from './Round';
import { Tile } from './Tile';
import { jeopardy } from './clues'

interface ColumnProps {
  column: typeof jeopardy[0];
  round: Round;
}

export function Column({ column, round }: ColumnProps) {
  const tiles = column.items.map((item, index) => 
    <Tile key={index} index={index} item={item} round={round} />)

  return (
    <div className='column'>
      <div className='category tile'>{column.category}</div>
      {tiles}
    </div>
  )
}
