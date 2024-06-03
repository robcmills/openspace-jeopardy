import { Outlet, useNavigate } from 'react-router-dom'
import { navigate } from './navigate'
import './root.css'
import { useAtomValue } from 'jotai'
import { socketAtom } from './socketAtom'
import { UsernameForm } from './UsernameForm'

export function RootRoute() {
  navigate.to = useNavigate()
  const { isSessionEstablished, sessionId } = useAtomValue(socketAtom)
  if (!sessionId) return <UsernameForm />
  if (!isSessionEstablished) {
    console.log('Connecting...')
    return <div>Connecting...</div>
  }
  return <Outlet />
}
