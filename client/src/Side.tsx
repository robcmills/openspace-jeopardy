import { Contestants } from './Contestants'
import { BLUE_BACKGROUND } from './colors'
import { useGameRouteData } from './useGameRouteData'

export function Side() {
  const { game, host } = useGameRouteData()

  const sideStyle = {
    display: 'grid',
    gap: 8,
  }

  return (
    <div style={sideStyle}>
      <h2 style={{ padding: '0 10px', backgroundColor: BLUE_BACKGROUND }}>
        {game.name}
      </h2>
      <h3 style={{ padding: '0 10px' }}>Host: {host.username}</h3>
      <Contestants />
    </div>
  )
}
