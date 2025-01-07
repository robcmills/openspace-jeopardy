import { useAtomValue } from 'jotai'
import { categoriesAtoms } from './categoriesAtoms'

export function useCategoryAtomValues() {
  return categoriesAtoms.map((categoryAtom) => useAtomValue(categoryAtom))
}
