import { useAtomValue } from 'jotai'
import { gameAtom } from './gameAtom'
import { usersAtom } from './usersAtom'

export function useHost() {
  const game = useAtomValue(gameAtom)
  const { usersById } = useAtomValue(usersAtom)
  return usersById[game.hostUserId]
}
