import { getGameState } from './getGameState'
import { jotaiStore } from './jotaiStore'
import { tilesAtoms } from './tilesAtoms'
import { doubleJeopardy, jeopardy } from './clues';
import { GameState } from './GameState'

export function getActiveClue() {
  const gameState = getGameState()
  if (
    !gameState ||
    ![GameState.Jeopardy, GameState.DoubleJeopardy].includes(gameState)
  ) {
    return null
  }
  const clues = gameState === GameState.Jeopardy ? jeopardy : doubleJeopardy

  for (const [columnIndex, column] of tilesAtoms.entries()) {
    for (const [rowIndex, tileAtom] of column.entries()) {
      if (jotaiStore.get(tileAtom) === 'answer') {
        return clues[columnIndex].items[rowIndex]
      }
    }
  }
}
