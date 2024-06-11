import { atom } from 'jotai'
import { ClientGame } from './ClientGame'

const initialGame = {
  id: '',
  hostUserId: '',
  name: '',
}

export const gameAtom = atom<ClientGame>(initialGame)
