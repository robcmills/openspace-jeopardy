import { Board } from './Board';
import { doubleJeopardy, jeopardy } from './clues';

interface JeopardyProps {
  round?: 1 | 2;
}

export function Jeopardy({ round = 1 }: JeopardyProps) {
  const columns = round === 1 ? jeopardy : doubleJeopardy;
  return (
    <Board columns={columns} />
  )
}
