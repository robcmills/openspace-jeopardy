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
import { ellipsify } from './styles'
import { useIsContestant } from './useIsContestant'

const sideStyle: CSSProperties = {
  display: 'grid',
  gridTemplateRows: 'auto 1fr auto',
  overflow: 'hidden',
}

const headerStyle: CSSProperties = {
  overflow: 'hidden',
}

const scrollStyle: CSSProperties = {
  alignContent: 'start',
  display: 'grid',
  gap: 10,
  overflowY: 'auto',
}

const gameNameStyle: CSSProperties = {
  ...ellipsify,
  height: 42,
  padding: '4px 10px',
  backgroundColor: BLUE_BACKGROUND,
}

const hostStyle: CSSProperties = {
  borderBottom: '1px solid white',
  height: 45,
  overflow: 'hidden',
  padding: '6px',
}

const hostNameStyle: CSSProperties = {
  ...ellipsify,
  padding: '0 6px 4px',
}

export function Side() {
  const game = useAtomValue(gameAtom)
  const host = useHost()
  const isContestant = useIsContestant()
  const isHost = useIsHost()
  const { gameState } = useGameState()
  const activeContestantId = useAtomValue(activeContestantAtom)

  const isContestantControlsVisible =
    isContestant &&
    [
      GameState.Jeopardy,
      GameState.DoubleJeopardy,
      GameState.FinalJeopardy,
    ].includes(gameState)

  return (
    <div id="Side" style={sideStyle}>
      <header style={headerStyle}>
        <h2 style={gameNameStyle} title={game.name}>
          {game.name}
        </h2>
        <div style={hostStyle}>
          <p style={hostNameStyle}>Host: {host?.username}</p>
          <Timer isActive={!activeContestantId} />
        </div>
      </header>
      <section id="ScrollSection" style={scrollStyle}>
        <Contestants />
        <Spectators />
      </section>
      {isHost && <HostControls />}
      {isContestantControlsVisible && <ContestantControls />}
    </div>
  )
}
