import { getNextGameState } from './getNextGameState'
import { getPreviousGameState } from './getPreviousGameState'
import { useCycleGameState } from './useCycleGameState'
import { useGameState } from './useGameState'

const style: React.CSSProperties = {
  display: 'grid',
  fontFamily: 'system-ui, sans-serif',
  fontWeight: 'bold',
  width: '35px',
}

export function HostCycleGameStateButton({
  direction,
}: {
  direction: 'next' | 'previous'
}) {
  const cycleGameState = useCycleGameState()
  const { gameState } = useGameState()

  // Don't render if game state can not be cycled
  if (
    (direction === 'next' && getNextGameState(gameState) === gameState) ||
    (direction === 'previous' && getPreviousGameState(gameState) === gameState)
  ) {
    return <div style={style} />
  }

  const onClick = () => {
    cycleGameState(direction)
  }

  const title = `${direction === 'next' ? '(n) Next' : '(p) Previous'} game state`

  return (
    <button onClick={onClick} style={style} title={title}>
      {direction === 'next' ? '→' : '←'}
    </button>
  )
}
