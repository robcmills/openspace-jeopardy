import { CSSProperties } from 'react'
import { UserState } from './UserState'
import { Contestant } from '../../server/Contestant'
import { BLUE_BACKGROUND, DARK_GRAY } from './colors'
import { useAtomValue } from 'jotai'
import { activeContestantAtom } from './activeContestantAtom'

const contestantStyle: CSSProperties = {
  display: 'grid',
  gap: 4,
  gridTemplateColumns: '2fr 10px 3fr',
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
  contestant: {
    contestant: Contestant
    user: UserState
  },
}

export function ContestantRow(props: ContestantRowProps) {
  const contestant = props.contestant.contestant
  const user = props.contestant.user
  const activeContestantId = useAtomValue(activeContestantAtom)

  const highlightStyle: CSSProperties = {
    background: activeContestantId === contestant.id
      ? 'white'
      : DARK_GRAY,
  }

  const score = contestant.score.toLocaleString()

  return (
    <div style={contestantStyle}>
      <div style={scoreStyle}>${score}</div>
      <div style={highlightStyle}></div>
      <div style={usernameStyle}>{user.username}</div>
    </div>
  )
}
