import { useState } from 'react'
import './App.css'
import { GameState } from './GameState'
import { Logo } from './Logo'
import { Intro } from './Intro'

export function App() {
  const [state, setState] = useState<GameState>(GameState.Intro)

  const content = {
    [GameState.Intro]: <Intro setState={setState} />,
    [GameState.Logo]: <Logo />,
  }[state]

  return (
    <div className='app'>
      {content}
    </div>
  )
}
