import { useAtomValue } from 'jotai'
import { gameAtom } from './gameAtom'
import { useContestants } from './useContestants'
import { CSSProperties } from 'react'

const style: CSSProperties = {
  padding: '0 10px',
}

export function Contestants() {
  const game = useAtomValue(gameAtom)
  const contestants = useContestants(game.id)
  const contestantsNodes = contestants.map(contestant => (
    <div key={contestant.id} style={style}>
      {contestant.username}
    </div>
  ))
  return (
    <div>
      <h3 style={style}>Contestants:</h3>
      {contestantsNodes}
    </div>
  )
}
