import { PrimitiveAtom } from 'jotai';
import { TileState, tilesAtoms } from './tilesAtoms';
import { jotaiStore } from './jotaiStore';
import fill from './assets/board-fill.mp3'

const audio = new Audio(fill)

const REVEAL_INTERVAL = 120

function removeRandomItem<T>(array: T[]): T | undefined {
  if (array.length === 0) return
  const randomIndex = Math.floor(Math.random() * array.length);
  return array.splice(randomIndex, 1)[0];
}

function revealRandomTile(atoms: PrimitiveAtom<TileState>[]) {
  const atom = removeRandomItem(atoms)
  if (atom) jotaiStore.set(atom, 'money' as TileState)
  if (atoms.length) {
    setTimeout(() => {
      revealRandomTile(atoms)
    }, REVEAL_INTERVAL)
  }

}

export function revealTiles() {
  audio.play()
  const atoms = tilesAtoms.flat();
  revealRandomTile(atoms)
}
