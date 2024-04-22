import './App.css'
import { Column } from './Column'
import { doubleJeopardy } from './clues'

export function App() {
  const columnNodes = doubleJeopardy.map((column) => {
    return <Column column={column} key={column.category} />
  })

  return (
    <div className='app'>
      {columnNodes}
    </div>
  )
}
