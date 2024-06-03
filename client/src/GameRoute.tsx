import { useAtomValue } from 'jotai'
// import { UsernameForm } from './UsernameForm'
import { socketAtom } from './socketAtom'
import { useLoaderData } from 'react-router-dom'
import type { Game as GameType } from '../../server/Game'
import { Game as GameComponent } from './Game'

export function GameRoute() {
  const game = useLoaderData() as GameType
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
  // const isHost = useIsHost()
  // if (!username) return <UsernameForm />
  const isHost = userId === game.hostUserId
  console.log('GameRoute', { isHost })
  // if isContestant or isSpectator
  return <GameComponent />
}
