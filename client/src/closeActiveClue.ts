import { gameAtom } from './gameAtom'
import { jotaiStore } from './jotaiStore'
import { socket } from './socket'
import { tilesAtoms } from './tilesAtoms'

export function closeActiveClue() {
  for (const [columnIndex, column] of tilesAtoms.entries()) {
    for (const [rowIndex, tileAtom] of column.entries()) {
      if (jotaiStore.get(tileAtom).step === 'answer') {
        jotaiStore.set(tileAtom, (prev) => ({ ...prev, step: 'blank' }))
        socket.emit('cycleTileState', {
          column: columnIndex,
          gameId: jotaiStore.get(gameAtom).id,
          row: rowIndex,
        })
        return
      }
    }
  }
}
