import { FinalJeopardy } from './FinalJeopardy';
import { Intro } from './Intro';
import { Jeopardy } from './Jeopardy';
import { Logo } from './Logo';
import { useGameState } from './useGameState';
import { useGameKeyBindings } from './useGameKeyBindings';
import { useEffect } from 'react';
import { socket } from './socket';
import { useAtomValue } from 'jotai';
import { gameAtom } from './gameAtom';
import { useUserRole } from './useUserRole';

export function Game() {
  console.log('Game component render')
  useGameKeyBindings()
  const { gameState } = useGameState()
  const game = useAtomValue(gameAtom)
  const userRole = useUserRole()

  useEffect(() => {
    if (userRole === null) return
    socket.emit('joinGame', { gameId: game.id, userRole })
  }, [])

  return ({
    intro: <Intro />,
    logo: <Logo />,
    jeopardy: <Jeopardy round={1} />,
    doubleJeopardy: <Jeopardy round={2} />,
    finalJeopardy: <FinalJeopardy />,
  })[gameState]
}
