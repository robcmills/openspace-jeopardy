import { PrimitiveAtom, atom } from 'jotai'
import { CategoryTileState } from './CategoryTileState'

const initialState: CategoryTileState = {
  category: '',
  step: 'logo',
}

export const categoriesAtoms: PrimitiveAtom<CategoryTileState>[] = []

for (let columnIndex = 0; columnIndex < 6; columnIndex++) {
  categoriesAtoms.push(atom(initialState))
}
