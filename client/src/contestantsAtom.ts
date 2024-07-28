import { atom } from 'jotai'
import { Contestant } from '../../server/Contestant'

export type ContestantsState = {
  contestantsById: Record<string, Contestant>
}

export const contestantsAtom = atom<ContestantsState>({
  contestantsById: {},
})
