import { Board } from './Board';
import { GameLayout } from './GameLayout';
import { Round } from './Round';
import { Side } from './Side';

interface JeopardyProps {
  round: Round;
}

export function Jeopardy({ round }: JeopardyProps) {
  return (
    <GameLayout
      left={<Board round={round} />}
      right={<Side />}
    />
  )
}
