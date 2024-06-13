import { useAtomValue } from 'jotai'
import { contestantsAtom } from './contestantsAtom'
import { usersAtom } from './usersAtom'

export function useContestants(gameId: string) {
  const { contestantsById } = useAtomValue(contestantsAtom)
  const { usersById } = useAtomValue(usersAtom)
  return Object.values(contestantsById)
    .filter(contestant => contestant.gameId === gameId)
    .map(contestant => ({
        contestant,
        user: usersById[contestant.userId],
      }))
}
