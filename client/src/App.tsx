import { CSSProperties } from 'react'
import './App.css'
import { absoluteFill } from './styles'
import { Outlet, useNavigate } from 'react-router-dom'
import { navigate } from './navigate'

export function App() {
  navigate.to = useNavigate()

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
