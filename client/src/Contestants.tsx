import { useAtomValue } from 'jotai'
import { gameAtom } from './gameAtom'
import { useContestants } from './useContestants'

export function Contestants() {
  const game = useAtomValue(gameAtom)
  const contestants = useContestants(game.id)
  const contestantsNodes = contestants.map(contestant => (
    <div key={contestant.id}>{contestant.username}</div>
  ))
  return (
    <div>
      <h3>Contestants:</h3>
      {contestantsNodes}
    </div>
  )
}
