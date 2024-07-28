import { CSSProperties } from 'react'
import jeopardy from './assets/openspace-jeopardy.jpg'
import double from './assets/double-jeopardy.jpg'
import { useGameState } from './useGameState'
import { GameState } from './GameState'

export function LogoImage() {
  const { gameState } = useGameState()

  const style: CSSProperties = {
    height: 'auto',
    objectFit: 'contain',
    width: '100%',
  }

  const src = gameState === GameState.DoubleJeopardy ? double : jeopardy

  return <img src={src} style={style} />
}
