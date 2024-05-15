import { CSSProperties, useState } from 'react'
import './App.css'
import { GameState } from './GameState'
import { Logo } from './Logo'
import { Intro } from './Intro'
import { Jeopardy } from './Jeopardy'
import { FinalJeopardy } from './FinalJeopardy'
import { useKeyBindings } from './useKeyBindings'
import { absoluteFill } from './styles'
import { Lobby } from './Lobby'

export function App() {
  const [gameState, setGameState] = useState<GameState>(GameState.Lobby)
  useKeyBindings({ gameState, setGameState })

  const content = {
    [GameState.Lobby]: <Lobby />,
    [GameState.Intro]: <Intro setGameState={setGameState} />,
    [GameState.Logo]: <Logo />,
    [GameState.Jeopardy]: <Jeopardy />,
    [GameState.DoubleJeopardy]: <Jeopardy round={2} />,
    [GameState.FinalJeopardy]: <FinalJeopardy />,
  }[gameState]

  const style: CSSProperties = {
    ...absoluteFill,
    placeContent: 'center',
    placeItems: 'center',
    display: 'grid',
  }

  return (
    <div id='App' style={style}>
      {content}
    </div>
  )
}
