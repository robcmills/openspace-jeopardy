import { atom } from 'jotai'
import { ClientGame } from './ClientGame'

const initialGame: ClientGame = {
  hasFinalJeopardy: true,
  id: '',
  hostUserId: '',
  name: '',
  rounds: [],
}

export const gameAtom = atom<ClientGame>(initialGame)
