import { useAtomValue } from 'jotai'
import { contestantsAtom } from './contestantsAtom'
import { usersAtom } from './usersAtom'
import { Contestant } from '../../server/Contestant'
import { UserState } from './UserState'

export function useContestants(gameId: string): (Contestant & UserState)[] {
  const { contestantsById } = useAtomValue(contestantsAtom)
  const { usersById } = useAtomValue(usersAtom)
  return Object.values(contestantsById)
    .filter(contestant => contestant.gameId === gameId)
    .map(contestant => ({
      ...contestant,
      ...usersById[contestant.userId],
      }))
}
