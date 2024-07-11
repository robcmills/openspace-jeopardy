import { CSSProperties, useEffect, useRef } from 'react'
import { UserState } from './UserState'
import { Contestant } from '../../server/Contestant'
import { BLUE_BACKGROUND, DARK_GRAY } from './colors'
import { useAtom, useAtomValue } from 'jotai'
import { activeContestantAtom } from './activeContestantAtom'
import { useIsHost } from './useIsHost'
import { socket } from './socket'
import { Timer } from './Timer'
import { ellipsify } from './styles'
import { timerAtom } from './timerAtom'
import { isElementVisible } from './isElementVisible'
import { finalJeopardyAtom } from './finalJeopardyAtom'

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
  ...ellipsify,
  backgroundColor: BLUE_BACKGROUND,
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
  const timerValue = useAtomValue(timerAtom)
  const finalJeopardyState = useAtomValue(finalJeopardyAtom)

  const rowRef = useRef<HTMLDivElement>(null)
  useEffect(() => {
    if (isActive && rowRef.current) {
      const parent = document.querySelector('#Side #ScrollSection')
      if (!parent || !(parent instanceof HTMLElement)) return
      const isVisible = isElementVisible(
        rowRef.current,
        parent
      )
      if (isVisible) return
      rowRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      })
    }
  }, [isActive])

  const toggleActive = () => {
    const nextActiveContestantId = isActive ? null : contestant.id
    setActiveContestantId(nextActiveContestantId)
    socket.emit('setActiveContestant', {
      contestantId: nextActiveContestantId,
      gameId: contestant.gameId,
    })
  }

  const onClickHighlight = isHost ? toggleActive : undefined

  const isGreen = (
    isHost &&
    contestant.question &&
    finalJeopardyState.step !== 'answer'
  )
  const highlightStyle: CSSProperties = {
    background: isActive
      ? 'white'
      : isGreen
      ? 'green'
      : DARK_GRAY,
    cursor: isHost ? 'pointer' : 'default',
  }

  const score = contestant.score.toLocaleString()

  return (
    <div ref={rowRef} style={rowStyle}>
      <div style={contestantStyle}>
        <div style={scoreStyle}>${score}</div>
        <div style={highlightStyle} onClick={onClickHighlight}></div>
        <div style={usernameStyle} title={user.username}>
          {user.username}
        </div>
      </div>
      {isActive && timerValue > 0 && <Timer isActive={isActive} />}
    </div>
  )
}
