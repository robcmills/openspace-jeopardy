import { CSSProperties, useState } from 'react'
import { useAtomValue } from 'jotai'
import { socketAtom } from './socketAtom'
import { UserRole } from './UserRole'
import { joinGameAsRole } from './joinGameAsRole'
import { gameAtom } from './gameAtom'

const style: CSSProperties = {
  display: 'grid',
  gap: 32,
  position: 'absolute',
  inset: 0,
  placeItems: 'center',
  placeContent: 'center',
}

export function JoinGame() {
  const [isJoining, setIsJoining] = useState(false)
  const game = useAtomValue(gameAtom)
  const { userId } = useAtomValue(socketAtom)

  const onClickJoinAs = (role: UserRole) => () => {
    setIsJoining(true)
    let sessionId = ''
    if (role === 'host') {
      const input = prompt('Enter session id to join as host')
      if (!input) {
        alert('Session id is required')
        return
      }
      sessionId = input
    }
    if (userId) joinGameAsRole({ gameId: game.id, role, sessionId, userId })
  }

  if (isJoining) {
    return <div style={style}>Joining...</div>
  }

  return (
    <div style={style}>
      <button onClick={onClickJoinAs('contestant')}>Join as Contestant</button>
      <button onClick={onClickJoinAs('spectator')}>Join as Spectator</button>
      <button onClick={onClickJoinAs('host')}>Join as Host</button>
    </div>
  )
}
