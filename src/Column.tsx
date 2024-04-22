import { Tile } from './Tile';
import { singleJeopardy } from './clues'

interface ColumnProps {
  column: typeof singleJeopardy[0];
}

export function Column({ column }: ColumnProps) {
  const tiles = column.items.map((item, index) => 
    <Tile key={index} index={index} item={item} />)

  return (
    <div className='column'>
      <div className='category tile'>{column.category}</div>
      {tiles}
    </div>
  )
}
