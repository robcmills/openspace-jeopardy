import { getGameState } from './getGameState'
import { jotaiStore } from './jotaiStore'
import { tilesAtoms } from './tilesAtoms'
import { isBoardGameState } from './getRoundForGameState'

export function getActiveClue() {
  const gameState = getGameState()
  if (!gameState || !isBoardGameState(gameState)) {
    return null
  }

  for (const tileAtom of tilesAtoms.flat()) {
    const tileState = jotaiStore.get(tileAtom)
    if (['answer', 'dailyDouble'].includes(tileState.step)) {
      return tileState
    }
  }
}
