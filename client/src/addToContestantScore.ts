import { GameState } from './GameState'
import { getRoundForGameState } from './getRoundForGameState'
import { getTileValue } from './getTileValue'
import { contestantsAtom } from './contestantsAtom'
import { gameAtom } from './gameAtom'
import { getActiveContestant } from './getActiveContestant'
import { getGameState } from './getGameState'
import { jotaiStore } from './jotaiStore'
import { setContestant } from './setContestant'
import { socket } from './socket'
import { tilesAtoms } from './tilesAtoms'

export function addToContestantScore(sign: number) {
  const activeContestant = getActiveContestant()
  const game = jotaiStore.get(gameAtom)
  const gameState = getGameState()
  if (!activeContestant || !gameState) return

  // Final Jeopardy
  if (gameState === GameState.FinalJeopardy) {
    const newScore = activeContestant.score + activeContestant.wager * sign
    setContestant({
      id: activeContestant.id,
      score: newScore,
    })
    socket.emit('setContestantScore', {
      contestantId: activeContestant.id,
      gameId: game.id,
      score: newScore,
    })
    return
  }

  // Board rounds
  const round = getRoundForGameState(gameState)
  if (!round) return
  for (const column of tilesAtoms) {
    for (const [rowIndex, tileAtom] of column.entries()) {
      const tileState = jotaiStore.get(tileAtom)
      if (tileState.step === 'answer') {
        const activeClueValue = getTileValue(game, round, rowIndex) * sign
        const newScore =
          activeContestant.score +
          (activeContestant.wager >= 0
            ? activeContestant.wager * sign
            : activeClueValue)
        jotaiStore.set(contestantsAtom, ({ contestantsById }) => ({
          contestantsById: {
            ...contestantsById,
            [activeContestant.id]: {
              ...contestantsById[activeContestant.id],
              score: newScore,
            },
          },
        }))
        socket.emit('setContestantScore', {
          contestantId: activeContestant.id,
          gameId: game.id,
          score: newScore,
        })
        return
      }
    }
  }
}
