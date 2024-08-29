import { atom } from 'jotai'

/**
 * A bit of a misnomer, this state holds the id of the last contestant to
 * correctly answer a question and have control of the board (or the very first
 * contestant of the game, chosen randomly).
 * In the event of a clue that no one is able to answer correctly, this
 * contestant regains active control of the board.
 **/
export const previousActiveContestantAtom = atom<string | null>(null)
