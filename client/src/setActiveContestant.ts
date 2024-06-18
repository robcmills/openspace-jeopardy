import { activeContestantAtom } from './activeContestantAtom'
import { gameAtom } from './gameAtom'
import { jotaiStore } from './jotaiStore'
import { socket } from './socket'

export function setActiveContestant(contestantId: string | null) {
  jotaiStore.set(activeContestantAtom, contestantId)
  const gameId = jotaiStore.get(gameAtom).id
  socket.emit('setActiveContestant', { contestantId, gameId })
}
