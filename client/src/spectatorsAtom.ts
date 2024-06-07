import { atom } from 'jotai';
import { Spectator } from '../../server/Spectator';

export type SpectatorsState = {
  spectatorsById: Record<string, Spectator>;
};

export const spectatorsAtom = atom<SpectatorsState>({
  spectatorsById: {},
})
