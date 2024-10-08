import { gameAtom } from './gameAtom'
import { getActiveContestant } from './getActiveContestant'
import { jotaiStore } from './jotaiStore'
import { setContestant } from './setContestant'
import { socket } from './socket'

export function resetActiveContestantWager() {
  const activeContestant = getActiveContestant()
  if (!activeContestant || activeContestant.wager < 0) return
  const game = jotaiStore.get(gameAtom)
  setContestant({
    id: activeContestant.id,
    question: '',
    wager: -1,
  })
  socket.emit('setContestantQuestion', {
    contestantId: activeContestant.id,
    gameId: game.id,
    question: '',
  })
  socket.emit('setContestantWager', {
    contestantId: activeContestant.id,
    gameId: game.id,
    wager: -1,
  })
}
