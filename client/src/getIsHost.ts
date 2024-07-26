import { gameAtom } from './gameAtom'
import { socketAtom } from './socketAtom'
import { jotaiStore } from './jotaiStore'

export function getIsHost() {
  const { userId } = jotaiStore.get(socketAtom)
  const { hostUserId } = jotaiStore.get(gameAtom)
  return userId === hostUserId
}
