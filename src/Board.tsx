import { jeopardy } from './clues'
import { Column } from './Column'
import { Round } from './Round';

interface BoardProps {
  columns: typeof jeopardy;
  round: Round;
}

export function Board({ columns, round }: BoardProps) {
  const columnNodes = columns.map((column) => {
    return <Column column={column} key={column.category} round={round} />
  })

  return (
    <div className='board'>
      {columnNodes}
    </div>
  )
}
