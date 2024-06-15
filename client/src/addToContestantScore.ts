import { GameState } from './GameState';
import { activeContestantAtom } from './activeContestantAtom';
import { contestantsAtom } from './contestantsAtom';
import { getGameState } from './getGameState';
import { jotaiStore } from './jotaiStore';
import { tilesAtoms } from './tilesAtoms';

export function addToContestantScore(sign: number) {
  const activeContestantId = jotaiStore.get(activeContestantAtom)
  const gameState = getGameState()
  if (!activeContestantId || !gameState) return

  for (const column of tilesAtoms) {
    for (const [rowIndex, tileAtom] of column.entries()) {
      const tileState = jotaiStore.get(tileAtom)
      if (tileState === 'answer') {
        const round = gameState === GameState.DoubleJeopardy ? 2 : 1
        const activeClueValue = (rowIndex + 1) * 200 * round * sign
        jotaiStore.set(contestantsAtom, ({ contestantsById }) => ({
          contestantsById: {
            ...contestantsById,
            [activeContestantId]: {
              ...contestantsById[activeContestantId],
              score: contestantsById[activeContestantId].score +
                activeClueValue,
            },
          },
        }))
        return
      }
    }
  }
}
