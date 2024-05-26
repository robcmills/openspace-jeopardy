import { CSSProperties, useRef } from 'react'
import { jeopardy } from './clues'
import { getCenterTransform } from './getCenterTransform'
import { Round } from './Round'
import { tilesAtoms } from './tilesAtoms'
import { useAtom } from 'jotai'
import { LogoBackground } from './LogoBackground'
import { getScaleTransform } from './getScaleTransform'
import { getFullScreenScaleTransform } from './getFullScreenScaleTransform'
import { BLUE_BACKGROUND } from './colors'
import { DailyDouble } from './DailyDouble'

export const tileStyle: CSSProperties = {
  backgroundColor: 'rgb(0, 30, 155)',
  border: '2px solid black',
  boxSizing: 'border-box',
  cursor: 'pointer',
  display: 'grid',
  fontWeight: 'bold',
  placeItems: 'center',
  position: 'relative',
  textAlign: 'center',
  textTransform: 'uppercase',
  transition: 'transform 1s',
}

interface TileProps {
  column: number;
  height: number;
  item: typeof jeopardy[number]['items'][number];
  round: Round;
  row: number;
  width: number;
}

export function Tile({ column, item, round, row, width }: TileProps) {
  const tileRef = useRef<HTMLDivElement>(null)

  const tileStateAtom = tilesAtoms[column][row]
  const [state, setState] = useAtom(tileStateAtom)

  const cycle = () =>
    setState(({
      logo: 'money',
      money: item.dailyDouble ? 'dailyDouble' : 'answer',
      dailyDouble: 'answer',
      answer: 'blank',
      blank: 'logo',
    } as const)[state])

  const money = `$${(row + 1) * 200 * round}`

  const node = {
    logo: <LogoBackground column={column} row={row} tileWidth={width} />,
    money: money,
    answer: item.answer,
    dailyDouble: <DailyDouble />,
    blank: '',
  }[state]

  const className = state

  const containerStyle: CSSProperties = {
    position: 'relative',
  }
  const shouldZoom = ['answer', 'dailyDouble'].includes(state)

  const borderColor = shouldZoom ? BLUE_BACKGROUND : 'black'

  const backdropStyle: CSSProperties = {
    ...tileStyle,
    background: BLUE_BACKGROUND,
    borderColor,
    inset: 0,
    position: 'absolute',
    zIndex: shouldZoom ? 1 : 0,
  }

  const style: CSSProperties = {
    ...tileStyle,
    borderColor,
    inset: 0,
    position: 'absolute',
    zIndex: shouldZoom ? 2 : 0,
  }

  if (shouldZoom && tileRef.current) {
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
