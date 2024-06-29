import { categoriesAtoms } from './categoriesAtoms'
import { jotaiStore } from './jotaiStore'
import { tilesAtoms } from './tilesAtoms'

export function getActiveCategory() {
  for (let column = 0; column < tilesAtoms.length; column++) {
    const columnAtoms = tilesAtoms[column]
    for (const atom of columnAtoms) {
      const { step } = jotaiStore.get(atom)
      if (['answer', 'dailyDouble'].includes(step)) {
      	return jotaiStore.get(categoriesAtoms[column]).category
      }
    }
  }
}
