import { useEffect, useState } from 'react'
import logo from './assets/openspace-jeopardy.jpg'

interface LogoBackgroundProps {
  column: number;
  row: number;
  tileWidth: number;
}

export function LogoBackground({ column, row, tileWidth }: LogoBackgroundProps) {
  const [backgroundPosition, setBackgroundPosition] = useState('0 0')
  const [backgroundSize, setBackgroundSize] = useState('0 0')

  useEffect(() => {
    const firstTile = document.querySelector('[data-column="0"][data-row="0"]')
    if (!firstTile) return
    const firstRect = firstTile.getBoundingClientRect()
    const lastTile = document.querySelector('[data-column="5"][data-row="4"]')
    if (!lastTile) return
    const lastRect = lastTile.getBoundingClientRect()
    const height = lastRect.top + lastRect.height - firstRect.top
    const width = lastRect.left + lastRect.width - firstRect.left
    setBackgroundSize(`${width}px ${height}px`)

    const secondColumnTile = document.querySelector('[data-column="1"][data-row="0"]')
    if (!secondColumnTile) return
    const secondColumnRect = secondColumnTile.getBoundingClientRect()
    const distanceX = secondColumnRect.left - firstRect.left
    const positionX = distanceX * column

    const secondRowTile = document.querySelector('[data-column="0"][data-row="1"]')
    if (!secondRowTile) return
    const secondRowRect = secondRowTile.getBoundingClientRect()
    const distanceY = secondRowRect.top - firstRect.top
    const positionY = distanceY * row
    setBackgroundPosition(`-${positionX}px -${positionY}px`)
  }, [tileWidth])

  const style = {
    backgroundImage: `url(${logo})`,
    backgroundOrigin: 'border-box',
    backgroundPosition,
    backgroundRepeat: 'no-repeat',
    backgroundSize,
    height: '100%',
    width: '100%',
  }

  return (
    <img data-column={column} data-row={row} style={style} />
  )
}
