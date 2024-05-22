import { atom } from 'jotai';
import { Game } from '../../server/Game';

const initialGame: Game = {
  id: '',
  hostUserId: '',
  name: '',
}

export const gameAtom = atom<Game>(initialGame)
