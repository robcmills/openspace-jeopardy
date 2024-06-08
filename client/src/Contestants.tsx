import { useAtomValue } from 'jotai'
import { gameAtom } from './gameAtom'
import { useContestants } from './useContestants'
import { CSSProperties } from 'react'

const headerStyle: CSSProperties = {
  backgroundColor: 'hsl(200, 100%, 20%)',
  padding: '4px 10px',
}

const contestantStyle: CSSProperties = {
  padding: '4px 10px',
}

export function Contestants() {
  const game = useAtomValue(gameAtom)
  const contestants = useContestants(game.id)

  const contestantsNodes = contestants.map(contestant => (
    <div key={contestant.id} style={contestantStyle}>
      {contestant.username}
    </div>
  ))

  const content = contestants.length === 0
    ? <div style={contestantStyle}>Awaiting contestants...</div>
    : contestantsNodes

  return (
    <div>
      <h3 style={headerStyle}>Contestants:</h3>
      {content}
    </div>
  )
}
