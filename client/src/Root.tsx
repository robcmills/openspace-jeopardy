import { Outlet, useNavigate } from 'react-router-dom'
import { navigate } from './navigate'
import './root.css'

export function Root() {
  navigate.to = useNavigate()
  return <Outlet />
}
