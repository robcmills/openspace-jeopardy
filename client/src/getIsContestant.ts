import { useAtomValue } from 'jotai'
import { gameAtom } from './gameAtom'
import { socketAtom } from './socketAtom'
import { contestantsAtom } from './contestantsAtom'

export function getIsContestant() {
  const game = useAtomValue(gameAtom)
  const { userId } = useAtomValue(socketAtom)
  const { contestantsById } = useAtomValue(contestantsAtom)
  return Object.values(contestantsById)
    .filter(contestant => contestant.gameId === game.id)
    .some(contestant => contestant.userId === userId)
}
