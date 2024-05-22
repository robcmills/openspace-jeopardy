import { FinalJeopardy } from './FinalJeopardy';
import { Intro } from './Intro';
import { Jeopardy } from './Jeopardy';
import { Logo } from './Logo';
import { useGameState } from './useGameState';
import { useKeyBindings } from './useKeyBindings';

export function Game() {
  useKeyBindings()
  const gameState = useGameState()

  return ({
    intro: <Intro />,
    logo: <Logo />,
    jeopardy: <Jeopardy />,
    doubleJeopardy: <Jeopardy round={2} />,
    finalJeopardy: <FinalJeopardy />,
  })[gameState]
}
