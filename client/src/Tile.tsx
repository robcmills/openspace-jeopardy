import { CSSProperties, useRef } from 'react'
import { getCenterTransform } from './getCenterTransform'
import { Round } from './Round'
import { tilesAtoms } from './tilesAtoms'
import { useAtom, useAtomValue, useSetAtom } from 'jotai'
import { LogoBackground } from './LogoBackground'
import { getScaleTransform } from './getScaleTransform'
import { BLUE_BACKGROUND } from './colors'
import { DailyDouble } from './DailyDouble'
import { typography } from './styles'
import { boardSizeAtom } from './boardSizeAtom'
import { socket } from './socket'
import { gameAtom } from './gameAtom'
import { useIsHost } from './useIsHost'
import { activeContestantAtom } from './activeContestantAtom'

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
  round: Round;
  row: number;
}

export function Tile({ column, round, row }: TileProps) {
  const game = useAtomValue(gameAtom)
  const setActiveContestant = useSetAtom(activeContestantAtom)
  const isHost = useIsHost()
  const boardSize = useAtomValue(boardSizeAtom)
  const tileRef = useRef<HTMLDivElement>(null)

  const tileStateAtom = tilesAtoms[column][row]
  const [tileState, setTileState] = useAtom(tileStateAtom)

  const cycle = () => {
    if (!isHost) return
    const nextStep = ({
      logo: 'money',
      money: tileState.isDailyDouble ? 'dailyDouble' : 'answer',
      dailyDouble: 'answer',
      answer: 'blank',
      blank: 'logo',
    } as const)[tileState.step]
    setTileState(prev => ({ ...prev, step: nextStep }))
    if (nextStep === 'answer' && tileState.step !== 'dailyDouble') {
      setActiveContestant(null)
      socket.emit('setActiveContestant', {
        contestantId: null,
        gameId: game.id,
      })
    }
    socket.emit('setTileState', {
      column,
      gameId: game.id,
      row,
      state: { ...tileState, step: nextStep },
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
    answer: tileState.answer,
    dailyDouble: <DailyDouble />,
    blank: '',
  }[tileState.step]

  const className = tileState.step

  const containerStyle: CSSProperties = {
    position: 'relative',
  }
  const shouldZoom = ['answer', 'dailyDouble'].includes(tileState.step)

  const borderColor = shouldZoom ? BLUE_BACKGROUND : 'black'

  const transition = tileState.step === 'blank' ? 'none' : 'transform 1s'

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
