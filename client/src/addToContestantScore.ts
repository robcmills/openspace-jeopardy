import { GameState } from './GameState';
import { contestantsAtom } from './contestantsAtom';
import { gameAtom } from './gameAtom';
import { getActiveContestant } from './getActiveContestant';
import { getGameState } from './getGameState';
import { jotaiStore } from './jotaiStore';
import { setContestant } from './setContestant';
import { socket } from './socket';
import { tilesAtoms } from './tilesAtoms';

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

  // Jeopardy and Double Jeopardy
  for (const column of tilesAtoms) {
    for (const [rowIndex, tileAtom] of column.entries()) {
      const tileState = jotaiStore.get(tileAtom)
      if (tileState.step === 'answer') {
        const round = gameState === GameState.DoubleJeopardy ? 2 : 1
        const activeClueValue = (rowIndex + 1) * 200 * round * sign
        const newScore = activeContestant.score + (
          activeContestant.wager
            ? activeContestant.wager * sign
            : activeClueValue
        )
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
