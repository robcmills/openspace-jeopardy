import { useAtomValue } from 'jotai'
import { gameAtom } from './gameAtom'
import { useContestants } from './useContestants'
import { CSSProperties } from 'react'
import { ContestantRow } from './ContestantRow'

const headerStyle: CSSProperties = {
  backgroundColor: 'hsl(200, 100%, 20%)',
  padding: '4px 10px',
}

const contestantsStyle: CSSProperties = {
  display: 'grid',
  gap: 4,
  padding: 4,
}

const emptyStyle: CSSProperties = {
  padding: 4,
}

export function Contestants() {
  const game = useAtomValue(gameAtom)
  const contestants = useContestants(game.id)

  const contestantsNodes = contestants.map(contestant => (
    <ContestantRow key={contestant.id} contestant={contestant} />
  ))

  const content = contestants.length === 0
    ? <div style={emptyStyle}>Awaiting contestants...</div>
    : contestantsNodes

  return (
    <div>
      <h3 style={headerStyle}>Contestants:</h3>
      <div style={contestantsStyle}>
        {content}
      </div>
    </div>
  )
}
