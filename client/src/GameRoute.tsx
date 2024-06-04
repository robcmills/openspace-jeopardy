import { useAtomValue } from 'jotai'
import { socketAtom } from './socketAtom'
import { Game as GameComponent } from './Game'
import { useGameRouteData } from './useGameRouteData'

export function GameRoute() {
  const { game } = useGameRouteData()
  const {
    isConnected,
    isSessionEstablished,
    sessionId,
    userId,
    username,
  } = useAtomValue(socketAtom)
  console.log(
    'GameRoute',
    {
      isConnected,
      isSessionEstablished,
      game,
      sessionId,
      username,
      userId,
    }
  )
  if (!isSessionEstablished || !game || !sessionId) {
    console.log('Loading...')
    return <div>Loading...</div>
  }
  const isHost = userId === game.hostUserId
  console.log('GameRoute', { isHost })
  // if isContestant or isSpectator
  return <GameComponent />
}
