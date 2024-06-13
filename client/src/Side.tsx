import { useAtomValue } from 'jotai'
import { Contestants } from './Contestants'
import { BLUE_BACKGROUND } from './colors'
import { gameAtom } from './gameAtom'
import { useHost } from './useHost'
import { Spectators } from './Spectators'
import { CSSProperties } from 'react'
import { ContestantControls } from './ContestantControls'

const sideStyle: CSSProperties = {
  display: 'grid',
  gridTemplateRows: '1fr auto',
  overflow: 'hidden',
}

const scrollStyle: CSSProperties = {
  alignContent: 'start',
  display: 'grid',
  gap: 8,
  overflowY: 'auto',
}

export function Side() {
  const game = useAtomValue(gameAtom)
  const host = useHost()

  return (
    <div style={sideStyle}>
      <div style={scrollStyle}>
        <h2 style={{
          padding: '4px 10px',
          backgroundColor: BLUE_BACKGROUND,
        }}>
          {game.name}
        </h2>
        <h3 style={{ padding: '0 10px' }}>Host: {host.username}</h3>
        <Contestants />
        <Spectators />
      </div>
      <ContestantControls />
    </div>
  )
}
