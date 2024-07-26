import { useAtomValue } from 'jotai'
import { gameAtom } from './gameAtom'
import { socketAtom } from './socketAtom'

export function useIsHost() {
  const { userId } = useAtomValue(socketAtom)
  const { hostUserId } = useAtomValue(gameAtom)
  return userId === hostUserId
}
