import logo from './assets/openspace-jeopardy.jpg'
import { useAtomValue } from 'jotai';
import { boardSizeAtom } from './boardSizeAtom';

interface LogoBackgroundProps {
  column: number;
  row: number;
}

export function LogoBackground({ column, row }: LogoBackgroundProps) {
  const { height, width } = useAtomValue(boardSizeAtom)

  const style = {
    backgroundImage: `url(${logo})`,
    backgroundOrigin: 'border-box',
    backgroundPosition: `-${width / 6 * column}px -${height / 6 * row}px`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: `${width}px ${height * 5 / 6}px`,
    height: '100%',
    width: '100%',
  }

  return (
    <img data-column={column} data-row={row} style={style} />
  )
}
