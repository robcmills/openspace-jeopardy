import { useAtomValue } from 'jotai'
import { Contestants } from './Contestants'
import { BLUE_BACKGROUND } from './colors'
import { gameAtom } from './gameAtom'
import { useHost } from './useHost'
import { Spectators } from './Spectators'

export function Side() {
  const game = useAtomValue(gameAtom)
  const host = useHost()

  const sideStyle = {
    display: 'grid',
    gap: 8,
  }

  return (
    <div style={sideStyle}>
      <h2 style={{ padding: '4px 10px', backgroundColor: BLUE_BACKGROUND }}>
        {game.name}
      </h2>
      <h3 style={{ padding: '0 10px' }}>Host: {host.username}</h3>
      <Contestants />
      <Spectators />
    </div>
  )
}
