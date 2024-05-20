import { atom } from 'jotai';
import { Game } from '../../server/Game';

export const gamesAtom = atom<Game[]>([])
