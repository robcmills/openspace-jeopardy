import { CSSProperties } from 'react'
import { UserState } from './UserState'
import { Contestant } from '../../server/Contestant'
import { BLUE_BACKGROUND, DARK_GRAY } from './colors'

const contestantStyle: CSSProperties = {
  display: 'grid',
  gap: 4,
  gridTemplateColumns: '1fr 10px 2fr',
}

const highlightStyle: CSSProperties = {
  background: DARK_GRAY,
}

const scoreStyle: CSSProperties = {
  alignItems: 'center',
  backgroundColor: BLUE_BACKGROUND,
  display: 'grid',
  padding: '0 4px',
}

const usernameStyle: CSSProperties = {
  alignItems: 'center',
  backgroundColor: BLUE_BACKGROUND,
  display: 'grid',
  padding: '0 4px',
}

type ContestantRowProps = {
  contestant: Contestant & UserState,
}

export function ContestantRow({ contestant }: ContestantRowProps) {
  return (
    <div style={contestantStyle}>
      <div style={scoreStyle}>${contestant.score}</div>
      <div style={highlightStyle}></div>
      <div style={usernameStyle}>{contestant.username}</div>
    </div>
  )
}
