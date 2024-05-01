import { useState, useEffect } from 'react'

export const tileAspect = 71 / 40
export const columnCount = 6
export const tileGap = 8
export const gaps = tileGap * columnCount

export function useTileWidth() {
  const [width, setWidth] = useState(0)
  useEffect(() => {
    const board = document.querySelector('#Board')
    if (!board) return
    setWidth((board.clientWidth - gaps) / columnCount)
  }, [])
  return width
}
