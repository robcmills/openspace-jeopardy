import { CSSProperties, useState } from 'react'
import { useGameRouteData } from './useGameRouteData'
import { useAtomValue } from 'jotai'
import { socketAtom } from './socketAtom'
import { UserRole } from './UserRole'
import { joinGameAsRole } from './joinGameAsRole'

const style: CSSProperties = {
  display: 'grid',
  gap: 8,
  position: 'absolute',
  inset: 0,
  placeItems: 'center',
  placeContent: 'center',
}

export function JoinGame() {
  const [isJoining, setIsJoining] = useState(false)
  const { game } = useGameRouteData()
  const { userId } = useAtomValue(socketAtom)

  const onClickJoinAs = (role: UserRole) => () => {
    setIsJoining(true)
    if (userId) joinGameAsRole({ gameId: game.id, role, userId })
  }

  if (isJoining) {
    return <div style={style}>Joining...</div>
  }

  return (
    <div style={style}>
      <button onClick={onClickJoinAs('contestant')}>Join as Contestant</button>
      <button onClick={onClickJoinAs('spectator')}>Join as Spectator</button>
    </div>
  )
}
