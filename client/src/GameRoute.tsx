import { useAtomValue } from 'jotai'
import { socketAtom } from './socketAtom'
import { Game as GameComponent } from './Game'
import { useGameRouteData } from './useGameRouteData'
import { JoinGame } from './JoinGame'

export function GameRoute() {
  const { contestants, game, spectators } = useGameRouteData()
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
  const isContestant = contestants.some(
    contestant => contestant.id === userId
  )
  const isSpectator = spectators.some(
    spectator => spectator.id === userId
  )
  console.log({ isHost, isContestant, isSpectator })
  if (isContestant || isHost || isSpectator) return <GameComponent />
  return <JoinGame />
}
