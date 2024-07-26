import { atom } from 'jotai'

export interface BoardSize {
  height: number
  width: number
}

const initialBoardSize: BoardSize = {
  height: 0,
  width: 0,
}

export const boardSizeAtom = atom<BoardSize>(initialBoardSize)
