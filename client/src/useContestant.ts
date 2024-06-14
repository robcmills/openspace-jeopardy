import { useAtomValue } from 'jotai'
import { gameAtom } from './gameAtom'
import { socketAtom } from './socketAtom'
import { useContestants } from './useContestants'

export function useContestant() {
  const game = useAtomValue(gameAtom)
  const contestants = useContestants(game.id)
  const { userId } = useAtomValue(socketAtom)

  return contestants.find(
    contestant => contestant.user.id === userId
  )
}
