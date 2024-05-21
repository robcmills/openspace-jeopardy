import { CSSProperties } from 'react'
import './App.css'
import { absoluteFill } from './styles'
import { Outlet } from 'react-router-dom'
import { useGameStateNavigation } from './useGameStateNavigation'

export function App() {
  useGameStateNavigation()

  const style: CSSProperties = {
    ...absoluteFill,
    placeContent: 'center',
    placeItems: 'center',
    display: 'grid',
  }

  return (
    <div id='App' style={style}>
      <Outlet />
    </div>
  )
}
