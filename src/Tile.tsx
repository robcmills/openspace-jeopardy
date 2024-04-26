import { CSSProperties, useRef, useState } from 'react';
import { jeopardy } from './clues'
import { getCenterTransform } from './getCenterTransform';
import { Round } from './Round';
import { LogoImage } from './LogoImage';

interface TileProps {
  index: number;
  item: typeof jeopardy[0]['items'][0];
  round: Round;
}

export function Tile({ index, item, round }: TileProps) {
  const tileRef = useRef<HTMLDivElement>(null)
  const [state, setState] = useState<'logo' | 'money' | 'answer' | 'blank'>('logo')

  const cycle = () =>
    setState(({
      logo: 'money',
      money: 'answer',
      answer: 'blank',
      blank: 'logo',
    } as const)[state])

  const money = `$${(index + 1) * 200 * round}`

  const node = {
    logo: <LogoImage />,
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
