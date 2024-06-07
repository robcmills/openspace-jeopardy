import { useAtomValue } from 'jotai'
import { socketAtom } from './socketAtom'
import { Game as GameComponent } from './Game'
import { JoinGame } from './JoinGame'
import { gameAtom } from './gameAtom'
import { useContestants } from './useContestants'
import { useSpectators } from './useSpectators'

export function GameRoute() {
  const game = useAtomValue(gameAtom)
  const contestants = useContestants(game.id)
  const spectators = useSpectators(game.id)
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
