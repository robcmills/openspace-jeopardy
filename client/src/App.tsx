import { CSSProperties } from 'react'
import './App.css'
import { GameState } from './GameState'
import { Logo } from './Logo'
import { Intro } from './Intro'
import { Jeopardy } from './Jeopardy'
import { FinalJeopardy } from './FinalJeopardy'
import { useKeyBindings } from './useKeyBindings'
import { absoluteFill } from './styles'
import { Lobby } from './Lobby'
import { useAtom } from 'jotai'
import { gameAtom } from './gameAtom'

export function App() {
  const [game, setGame] = useAtom(gameAtom)
  const setGameState = (gameState: GameState) =>
    setGame({ ...game, state: gameState })
  useKeyBindings({ gameState: game.state, setGameState })

  const content = {
    [GameState.Lobby]: <Lobby />,
    [GameState.Intro]: <Intro setGameState={setGameState} />,
    [GameState.Logo]: <Logo />,
    [GameState.Jeopardy]: <Jeopardy />,
    [GameState.DoubleJeopardy]: <Jeopardy round={2} />,
    [GameState.FinalJeopardy]: <FinalJeopardy />,
  }[game.state]

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
