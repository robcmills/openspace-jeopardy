import { gameAtom } from './gameAtom'
import { getNextGameState } from './getNextGameState'
import { getPreviousGameState } from './getPreviousGameState'
import { useCycleGameState } from './useCycleGameState'
import { useAtomValue } from 'jotai'
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
  const game = useAtomValue(gameAtom)

  // Don't render if game state can not be cycled
  if (
    (direction === 'next' && getNextGameState(gameState, game) === gameState) ||
    (direction === 'previous' &&
      getPreviousGameState(gameState, game) === gameState)
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
