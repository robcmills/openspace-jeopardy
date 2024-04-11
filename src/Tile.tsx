import { CSSProperties, useRef, useState } from 'react';
import { columns } from './columns'
import { getCenterTransform } from './getCenterTransform';

interface TileProps {
  index: number;
  item: typeof columns[0]['items'][0];
}

export function Tile({ index, item }: TileProps) {
  const tileRef = useRef<HTMLDivElement>(null)
  const [state, setState] = useState<'money' | 'answer' | 'blank'>('money')

  const cycle = () =>
    setState(({
      money: 'answer',
      answer: 'blank',
      blank: 'money',
    } as const)[state])

  const money = `$${(index + 1) * 200}`

  const node = {
    money: money,
    answer: item.answer,
    blank: '',
  }[state]

  const className = [state, 'tile'].join(' ')

  const style: CSSProperties = {}
  if (state === 'answer') {
    style.transform = [
      getCenterTransform(tileRef.current!),
      'scale(6)'
    ].join(' ')
  }

  return (
    <div className={className} onClick={cycle} ref={tileRef} style={style}>
      {node}
    </div>
  )
}
