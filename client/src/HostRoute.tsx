import { Navigate } from 'react-router-dom'
import { useIsHost } from './useIsHost'
import { HostView } from './HostView'
import { useAtomValue } from 'jotai'
import { gameAtom } from './gameAtom'
import { socketAtom } from './socketAtom'

export function HostRoute() {
  const game = useAtomValue(gameAtom)
  const { isSessionEstablished, sessionId } = useAtomValue(socketAtom)
  const isHost = useIsHost()

  if (!isSessionEstablished || !game || !sessionId) {
    console.log('Loading...')
    return <div>Loading...</div>
  }

  return isHost ? <HostView /> : <Navigate to="/lobby" />
}
