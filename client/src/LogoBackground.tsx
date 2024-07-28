import { useAtomValue } from 'jotai'
import { boardSizeAtom } from './boardSizeAtom'
import jeopardy from './assets/openspace-jeopardy.jpg'
import double from './assets/double-jeopardy.jpg'
import { useGameState } from './useGameState'
import { GameState } from './GameState'

interface LogoBackgroundProps {
  column: number
  row: number
}

export function LogoBackground({ column, row }: LogoBackgroundProps) {
  const { height, width } = useAtomValue(boardSizeAtom)
  const { gameState } = useGameState()

  const url = gameState === GameState.DoubleJeopardy ? double : jeopardy

  const style = {
    backgroundImage: `url(${url})`,
    backgroundOrigin: 'border-box',
    backgroundPosition: `-${(width / 6) * column}px -${(height / 6) * row}px`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: `${width}px ${(height * 5) / 6}px`,
    height: '100%',
    width: '100%',
  }

  return <img data-column={column} data-row={row} style={style} />
}
