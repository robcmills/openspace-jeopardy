import { CSSProperties, useRef } from 'react';
import { jeopardy } from './clues'
import { getCenterTransform } from './getCenterTransform';
import { Round } from './Round';
import { tilesAtoms } from './tilesAtoms';
import { useAtom } from 'jotai';
import { LogoBackground } from './LogoBackground';

interface TileProps {
  column: number;
  item: typeof jeopardy[0]['items'][0];
  round: Round;
  row: number;
}

export function Tile({ column, item, round, row }: TileProps) {
  const tileRef = useRef<HTMLDivElement>(null)

  const tileStateAtom = tilesAtoms[column][row]
  const [state, setState] = useAtom(tileStateAtom)

  const cycle = () =>
    setState(({
      logo: 'money',
      money: 'answer',
      answer: 'blank',
      blank: 'logo',
    } as const)[state])

  const money = `$${(row + 1) * 200 * round}`

  const node = {
    logo: <LogoBackground column={column} row={row} />,
    money: money,
    answer: item.answer,
    blank: '',
  }[state]

  const className = [state, 'tile'].join(' ')

  const style: CSSProperties = {
    position: 'relative',
    zIndex: state === 'answer' ? 1 : 0,
  }
  if (state === 'answer') {
    style.transform = [
      getCenterTransform(tileRef.current!),
      'scale(7)'
    ].join(' ')
  }

  return (
    <div className={className} onClick={cycle} ref={tileRef} style={style}>
      {node}
    </div>
  )
}
