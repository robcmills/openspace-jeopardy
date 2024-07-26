import { useAtomValue } from 'jotai'
import { gameAtom } from './gameAtom'
import { socketAtom } from './socketAtom'
import { useContestants } from './useContestants'
import { useSpectators } from './useSpectators'
import { useIsHost } from './useIsHost'

export function useUserRole() {
  const game = useAtomValue(gameAtom)
  const contestants = useContestants(game.id)
  const spectators = useSpectators(game.id)
  const { userId } = useAtomValue(socketAtom)

  const isHost = useIsHost()
  if (isHost) return 'host'

  const isContestant = contestants.some(
    (contestant) => contestant.user.id === userId,
  )
  if (isContestant) return 'contestant'

  const isSpectator = spectators.some((spectator) => spectator.id === userId)
  if (isSpectator) return 'spectator'

  return null
}
