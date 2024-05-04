import { CSSProperties, useRef } from 'react';
import { jeopardy } from './clues';
import { getCenterTransform } from './getCenterTransform';
import { Round } from './Round';
import { tilesAtoms } from './tilesAtoms';
import { useAtom } from 'jotai';
import { LogoBackground } from './LogoBackground';
import { tileAspect, useTileWidth } from './useTileWidth';
import { getScaleTransform } from './getScaleTransform';
import { getFullScreenScaleTransform } from './getFullScreenScaleTransform';
import { BLUE_BACKGROUND } from './colors';

interface TileProps {
  column: number;
  item: typeof jeopardy[0]['items'][0];
  round: Round;
  row: number;
}

export function Tile({ column, item, round, row }: TileProps) {
  const tileRef = useRef<HTMLDivElement>(null)

  const width = useTileWidth()

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
    logo: <LogoBackground column={column} row={row} tileWidth={width} />,
    money: money,
    answer: item.answer,
    blank: '',
  }[state]

  const className = [state, 'tile'].join(' ')

  const containerStyle: CSSProperties = {
    height: width / tileAspect,
    position: 'relative',
    width,
  }

  const style: CSSProperties = {
    inset: 0,
    position: 'absolute',
    zIndex: state === 'answer' ? 2 : 0,
  }

  const backdropStyle: CSSProperties = {
    background: BLUE_BACKGROUND,
    inset: 0,
    position: 'absolute',
    zIndex: state === 'answer' ? 1 : 0,
  }

  if (state === 'answer' && tileRef.current) {
    style.transform = [
      getCenterTransform(tileRef.current),
      getScaleTransform(tileRef.current)
    ].join(' ')
    backdropStyle.transform = [
      getCenterTransform(tileRef.current),
      getFullScreenScaleTransform(tileRef.current)
    ].join(' ')
  }

  return (
    <div style={containerStyle} onClick={cycle} ref={tileRef}>
      <div className={className} style={backdropStyle} />
      <div className={className} style={style}>
        {node}
      </div>
    </div>
  )
}
