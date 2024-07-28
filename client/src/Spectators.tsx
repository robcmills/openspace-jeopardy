import { useAtomValue } from 'jotai'
import { gameAtom } from './gameAtom'
import { useSpectators } from './useSpectators'
import { CSSProperties } from 'react'

const headerStyle: CSSProperties = {
  backgroundColor: 'hsl(180, 100%, 20%)',
  padding: '4px 10px',
}

const spectatorStyle: CSSProperties = {
  padding: '4px 10px',
}

export function Spectators() {
  const game = useAtomValue(gameAtom)
  const spectators = useSpectators(game.id)

  const spectatorsNodes = spectators.map((spectator) => (
    <div key={spectator.id} style={spectatorStyle}>
      {spectator.username}
    </div>
  ))

  const content =
    spectators.length === 0 ? (
      <div style={spectatorStyle}>Awaiting spectators...</div>
    ) : (
      spectatorsNodes
    )

  return (
    <div>
      <h3 style={headerStyle}>Spectators:</h3>
      {content}
    </div>
  )
}
