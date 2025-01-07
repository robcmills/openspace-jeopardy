import { categoriesAtoms } from './categoriesAtoms'
import { CategoryTileState } from './CategoryTileState'
import { gameAtom } from './gameAtom'
import { jotaiStore } from './jotaiStore'
import { socket } from './socket'

/*
 * Can only be called by host
 * so we can include the socket emission
 */
export function revealCategory({
  category,
  column,
}: {
  category: string
  column: number
}) {
  const game = jotaiStore.get(gameAtom)
  const categoryAtom = categoriesAtoms[column]
  const nextState: CategoryTileState = { category, step: 'category' }
  jotaiStore.set(categoryAtom, nextState)
  socket.emit('setCategoryState', {
    column,
    gameId: game.id,
    state: nextState,
  })
}
