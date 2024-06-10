import { CSSProperties, useRef } from 'react'
import { jeopardy } from './clues'
import { getCenterTransform } from './getCenterTransform'
import { Round } from './Round'
import { tilesAtoms } from './tilesAtoms'
import { useAtom, useAtomValue } from 'jotai'
import { LogoBackground } from './LogoBackground'
import { getScaleTransform } from './getScaleTransform'
import { BLUE_BACKGROUND } from './colors'
import { DailyDouble } from './DailyDouble'
import { typography } from './styles'
import { boardSizeAtom } from './boardSizeAtom'
import { socket } from './socket'
import { gameAtom } from './gameAtom'
import { useIsHost } from './useIsHost'

export const tileStyle: CSSProperties = {
  backgroundColor: 'rgb(0, 30, 155)',
  border: '2px solid black',
  boxSizing: 'border-box',
  cursor: 'pointer',
  display: 'grid',
  fontWeight: 'bold',
  overflow: 'hidden',
  placeItems: 'center',
  position: 'relative',
  textAlign: 'center',
  textTransform: 'uppercase',
}

interface TileProps {
  column: number;
  item: typeof jeopardy[number]['items'][number];
  round: Round;
  row: number;
}

export function Tile({ column, item, round, row }: TileProps) {
  const game = useAtomValue(gameAtom)
  const isHost = useIsHost()
  const boardSize = useAtomValue(boardSizeAtom)
  const tileRef = useRef<HTMLDivElement>(null)

  const tileStateAtom = tilesAtoms[column][row]
  const [state, setState] = useAtom(tileStateAtom)

  const cycle = () => {
    if (!isHost) return
    const nextState = ({
      logo: 'money',
      money: item.dailyDouble ? 'dailyDouble' : 'answer',
      dailyDouble: 'answer',
      answer: 'blank',
      blank: 'logo',
    } as const)[state]
    setState(nextState)
    socket.emit('setTileState', {
      column,
      gameId: game.id,
      row,
      state: nextState,
    })
  }

  const money = (
    <span style={{
      color: 'rgb(254, 199, 95)',
      fontSize: `${boardSize.height / 16}px`
    }}>
     {`$${(row + 1) * 200 * round}`}
    </span>
  )

  const node = {
    logo: <LogoBackground column={column} row={row} />,
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

  const transition = state === 'blank' ? 'none' : 'transform 1s'

  const backdropStyle: CSSProperties = {
    ...tileStyle,
    background: BLUE_BACKGROUND,
    borderColor,
    inset: 0,
    position: 'absolute',
    transition,
    zIndex: shouldZoom ? 1 : 0,
  }

  const style: CSSProperties = {
    ...tileStyle,
    ...typography,
    borderColor,
    fontSize: `${boardSize.height / 128}px`,
    inset: 0,
    position: 'absolute',
    transition,
    zIndex: shouldZoom ? 2 : 0,
  }

  if (shouldZoom && tileRef.current) {
    const container = document.getElementById('left')
    if (!container) {
      console.error('tile container not found')
      return
    }
    style.transform = [
      getCenterTransform(tileRef.current, container),
      getScaleTransform({
        element: tileRef.current,
        container,
        contain: true,
      })
    ].join(' ')
    backdropStyle.transform = [
      getCenterTransform(tileRef.current, container),
      getScaleTransform({
        element: tileRef.current,
        container,
        contain: false,
      })
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
