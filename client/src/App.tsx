import { CSSProperties, useState } from 'react'
import './App.css'
import { GameState } from './GameState'
import { Logo } from './Logo'
import { Intro } from './Intro'
import { Jeopardy } from './Jeopardy'
import { FinalJeopardy } from './FinalJeopardy'
import { useKeyBindings } from './useKeyBindings'
import { absoluteFill } from './styles'

export function App() {
  const [state, setState] = useState<GameState>(GameState.Intro)
  useKeyBindings({ state, setState })

  const content = {
    [GameState.Intro]: <Intro setState={setState} />,
    [GameState.Logo]: <Logo />,
    [GameState.Jeopardy]: <Jeopardy />,
    [GameState.DoubleJeopardy]: <Jeopardy round={2} />,
    [GameState.FinalJeopardy]: <FinalJeopardy />,
  }[state]

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
