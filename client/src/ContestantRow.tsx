import { CSSProperties } from 'react'
import { UserState } from './UserState'
import { Contestant } from '../../server/Contestant'
import { BLUE_BACKGROUND, DARK_GRAY } from './colors'
import { useAtom } from 'jotai'
import { activeContestantAtom } from './activeContestantAtom'
import { useIsHost } from './useIsHost'
import { socket } from './socket'
import { Timer } from './Timer'

const rowStyle: CSSProperties = { }

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
  const [activeContestantId, setActiveContestantId] = useAtom(activeContestantAtom)
  const isActive = activeContestantId === contestant.id
  const isHost = useIsHost()

  const toggleActive = () => {
    const nextActiveContestantId = isActive ? null : contestant.id
    setActiveContestantId(nextActiveContestantId)
    socket.emit('setActiveContestant', {
      contestantId: nextActiveContestantId,
      gameId: contestant.gameId,
    })
  }

  const onClickHighlight = isHost ? toggleActive : undefined

  const highlightStyle: CSSProperties = {
    background: isActive ? 'white' : DARK_GRAY,
    cursor: isHost ? 'pointer' : 'default',
  }

  const score = contestant.score.toLocaleString()

  return (
    <div style={rowStyle}>
      <div style={contestantStyle}>
        <div style={scoreStyle}>${score}</div>
        <div style={highlightStyle} onClick={onClickHighlight}></div>
        <div style={usernameStyle}>{user.username}</div>
      </div>
      <Timer isActive={isActive} />
    </div>
  )
}
