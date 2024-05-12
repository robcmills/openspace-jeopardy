import { Board } from './Board';
import { Round } from './Round';
import { doubleJeopardy, jeopardy } from './clues';

interface JeopardyProps {
  round?: Round;
}

export function Jeopardy({ round = 1 }: JeopardyProps) {
  const columns = round === 1 ? jeopardy : doubleJeopardy;
  return (
    <Board columns={columns} round={round} />
  )
}
