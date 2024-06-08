import { useAtomValue } from 'jotai'
import { socketAtom } from './socketAtom'
import { Game as GameComponent } from './Game'
import { JoinGame } from './JoinGame'
import { gameAtom } from './gameAtom'
import { useUserRole } from './useUserRole'

export function GameRoute() {
  const game = useAtomValue(gameAtom)
  const { isSessionEstablished, sessionId } = useAtomValue(socketAtom)
  const userRole = useUserRole()

  if (!isSessionEstablished || !game || !sessionId) {
    console.log('Loading...')
    return <div>Loading...</div>
  }

  return userRole ? <GameComponent /> : <JoinGame />
}
