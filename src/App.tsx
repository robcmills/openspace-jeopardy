import './App.css'
import { Column } from './Column'
import { columns } from './columns'

export function App() {
  const columnsNodes = columns.map((column) => {
    return <Column column={column} key={column.category} />
  })

  return (
    <div className='app'>
      {columnsNodes}
    </div>
  )
}
