import { CSSProperties } from 'react'
import { DARK_GRAY, RED } from './colors'
import { useAtomValue } from 'jotai'
import { timerAtom } from './timerAtom'

const timerStyle: CSSProperties = {
  display: 'grid',
  gap: 4,
  gridAutoFlow: 'column',
  padding: '4px 0',
}

type TimerProps = {
  isActive: boolean
}

export function Timer({ isActive }: TimerProps) {
  const timerValue = useAtomValue(timerAtom)

  const timeSquares = Array.from({ length: 9 }).map((_, i) => {
    const timeSquareStyle: CSSProperties = {
      backgroundColor: isActive &&
        (i > 4 - timerValue && i < timerValue + 4)
        ? RED : DARK_GRAY,
      height: 8,
    }
    return <div key={i} style={timeSquareStyle} />
  })

  return (
    <div style={timerStyle}>
      {timeSquares}
    </div>
  )
}
