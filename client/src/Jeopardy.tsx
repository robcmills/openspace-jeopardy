import { Board } from './Board';
import { GameLayout } from './GameLayout';
import { Round } from './Round';
import { Side } from './Side';
import { doubleJeopardy, jeopardy } from './clues';

interface JeopardyProps {
  round?: Round;
}

export function Jeopardy({ round = 1 }: JeopardyProps) {
  const columns = round === 1 ? jeopardy : doubleJeopardy;
  return (
    <GameLayout
      left={<Board columns={columns} round={round} />}
      right={<Side />}
    />
  )
}
