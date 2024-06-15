import { gameAtom } from './gameAtom';
import { jotaiStore } from './jotaiStore';
import { socket } from './socket';
import { tilesAtoms } from './tilesAtoms';

export function closeActiveClue() {
  for (const [columnIndex, column] of tilesAtoms.entries()) {
    for (const [rowIndex, tileAtom] of column.entries()) {
      console.log({
        columnIndex,
        rowIndex,
        tileAtom: jotaiStore.get(tileAtom),
      })
      if (jotaiStore.get(tileAtom) === 'answer') {
        jotaiStore.set(tileAtom, 'blank')
        socket.emit('setTileState', {
          column: columnIndex,
          gameId: jotaiStore.get(gameAtom).id,
          row: rowIndex,
          state: 'blank',
        })
        return
      }
    }
  }
}
