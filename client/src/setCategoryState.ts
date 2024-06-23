import { CategoryTileState } from './CategoryTileState';
import { categoriesAtoms } from './categoriesAtoms';
import { jotaiStore } from './jotaiStore';

type SetCategoryStateArgs = {
  column: number
  state: CategoryTileState
}

export function setCategoryState({ column, state }: SetCategoryStateArgs) {
  const categoryAtom = categoriesAtoms[column]
  jotaiStore.set(categoryAtom, state)
}
