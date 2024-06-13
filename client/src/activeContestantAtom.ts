import { atom } from 'jotai'

/* holds a contestant id */
export const activeContestantAtom = atom<string | null>(null)
