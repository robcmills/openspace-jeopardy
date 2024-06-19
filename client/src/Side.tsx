import { useAtomValue } from 'jotai'
import { Contestants } from './Contestants'
import { BLUE_BACKGROUND } from './colors'
import { gameAtom } from './gameAtom'
import { useHost } from './useHost'
import { Spectators } from './Spectators'
import { CSSProperties } from 'react'
import { ContestantControls } from './ContestantControls'
import { useIsHost } from './useIsHost'
import { HostControls } from './HostControls'
import { useGameState } from './useGameState'
import { GameState } from './GameState'
import { Timer } from './Timer'
import { activeContestantAtom } from './activeContestantAtom'

const sideStyle: CSSProperties = {
  display: 'grid',
  gridTemplateRows: '1fr auto',
  overflow: 'hidden',
}

const scrollStyle: CSSProperties = {
  alignContent: 'start',
  display: 'grid',
  gap: 4,
  overflowY: 'auto',
}

export function Side() {
  const game = useAtomValue(gameAtom)
  const host = useHost()
  const isHost = useIsHost()
  const { gameState } = useGameState()
  const activeContestantId = useAtomValue(activeContestantAtom)

  const controlsVisible = [
    GameState.Jeopardy,
    GameState.DoubleJeopardy,
    GameState.FinalJeopardy,
  ].includes(gameState)

  const controls = isHost
    ? <HostControls />
    : <ContestantControls />

  return (
    <div style={sideStyle}>
      <div style={scrollStyle}>
        <h2 style={{
          padding: '4px 10px',
          backgroundColor: BLUE_BACKGROUND,
        }}>
          {game.name}
        </h2>
        <div style={{ padding: '0 4px' }}>
          <p style={{ padding: '0 6px 4px' }}>Host: {host.username}</p>
          <Timer isActive={!activeContestantId} />
        </div>
        <Contestants />
        <Spectators />
      </div>
      {controlsVisible && controls}
    </div>
  )
}
