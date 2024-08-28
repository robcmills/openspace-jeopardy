import { atom } from 'jotai'

/* holds a contestant id */
export const previousActiveContestantAtom = atom<string | null>(null)
