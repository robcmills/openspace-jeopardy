import { PrimitiveAtom, atom } from 'jotai'

export type CategoryTileState = 'logo' | 'category'

const initialState = 'logo' as CategoryTileState

export const categoriesAtoms: PrimitiveAtom<CategoryTileState>[] = []

for (let columnIndex = 0; columnIndex < 6; columnIndex++) {
  categoriesAtoms.push(atom(initialState))
}
