import { atom } from 'jotai';
import { GameState } from './GameState';
import { Game } from '../../server/Game';

const initialGame: Game = {
  id: '',
  hostUserId: '',
  state: GameState.Lobby,
}

export const gameAtom = atom<Game>(initialGame)
