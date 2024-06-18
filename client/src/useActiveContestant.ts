import { useAtomValue } from 'jotai';
import { activeContestantAtom } from './activeContestantAtom';
import { useContestants } from './useContestants';
import { gameAtom } from './gameAtom';

export function useActiveContestant() {
  const activeContestantId = useAtomValue(activeContestantAtom)
  const game = useAtomValue(gameAtom)
  const contestants = useContestants(game.id)
  return contestants.find(({ contestant }) => contestant.id === activeContestantId)
}
