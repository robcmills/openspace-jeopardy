import { getGameState } from './getGameState'
import { jotaiStore } from './jotaiStore'
import { tilesAtoms } from './tilesAtoms'
import { GameState } from './GameState'

export function getActiveClue() {
  const gameState = getGameState()
  if (
    !gameState ||
    ![GameState.Jeopardy, GameState.DoubleJeopardy].includes(gameState)
  ) {
    return null
  }

  for (const tileAtom of tilesAtoms.flat()) {
    const tileState = jotaiStore.get(tileAtom)
    if (['answer', 'dailyDouble'].includes(tileState.step)) {
      return tileState
    }
  }
}
