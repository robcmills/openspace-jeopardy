import { PrimitiveAtom, atom } from 'jotai'
import { CategoryTileState } from './CategoryTileState'

export const initialCategoryState: CategoryTileState = {
  category: '',
  step: 'logo',
}

export const categoriesAtoms: PrimitiveAtom<CategoryTileState>[] = []

for (let columnIndex = 0; columnIndex < 6; columnIndex++) {
  categoriesAtoms.push(atom(initialCategoryState))
}
