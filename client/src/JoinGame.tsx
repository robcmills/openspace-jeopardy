import { CSSProperties, useState } from 'react'
import { useGameRouteData } from './useGameRouteData'
import { joinGameAsContestant } from './joinGameAsContestant'
import { useAtomValue } from 'jotai'
import { socketAtom } from './socketAtom'

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

  const onClickJoinAsContestant = () => {
    setIsJoining(true)
    if (userId) joinGameAsContestant(game.id, userId)
  }

  if (isJoining) {
    return <div style={style}>Joining...</div>
  }

  return (
    <div style={style}>
      <button onClick={onClickJoinAsContestant}>Join as Contestant</button>
      <button>Join as Spectator</button>
      <button>Join as Host</button>
    </div>
  )
}
