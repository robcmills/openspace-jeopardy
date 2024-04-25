import { doubleJeopardy } from './clues'
import { Column } from './Column'

export function Board() {
  const columnNodes = doubleJeopardy.map((column) => {
    return <Column column={column} key={column.category} />
  })

  return (
    <div className='board'>
      {columnNodes}
    </div>
  )
}
