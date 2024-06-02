import { FinalJeopardy } from './FinalJeopardy';
import { Intro } from './Intro';
import { Jeopardy } from './Jeopardy';
import { Logo } from './Logo';
import { useGameState } from './useGameState';
import { useGameKeyBindings } from './useGameKeyBindings';

export function Game() {
  console.log('Game component render')
  useGameKeyBindings()
  const { gameState } = useGameState()

  return ({
    intro: <Intro />,
    logo: <Logo />,
    jeopardy: <Jeopardy round={1} />,
    doubleJeopardy: <Jeopardy round={2} />,
    finalJeopardy: <FinalJeopardy />,
  })[gameState]
}
