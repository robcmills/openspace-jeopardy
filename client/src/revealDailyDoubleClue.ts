import { jotaiStore } from './jotaiStore';
import { tilesAtoms } from './tilesAtoms';

export function revealDailyDoubleClue() {
  for (const [columnIndex, column] of tilesAtoms.entries()) {
    for (const [rowIndex, tileStateAtom] of column.entries()) {
      const state = jotaiStore.get(tileStateAtom)
      if (state === 'dailyDouble') {
        jotaiStore.set(tileStateAtom, 'answer')
        return { column: columnIndex, row: rowIndex }
      }
    }
  }
  return null
}
