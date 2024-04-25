import { jeopardy } from './clues'
import { Column } from './Column'

interface BoardProps {
  columns: typeof jeopardy;
}

export function Board({ columns }: BoardProps) {
  const columnNodes = columns.map((column) => {
    return <Column column={column} key={column.category} />
  })

  return (
    <div className='board'>
      {columnNodes}
    </div>
  )
}
