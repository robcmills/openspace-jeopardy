import { useState, useEffect } from 'react'

export const tileAspect = 71 / 40
export const columnCount = 6
export const rowCount = 6
export const tileGap = 8
export const xgaps = tileGap * columnCount
export const ygaps = tileGap * rowCount

export function useTileWidth() {
  const [width, setWidth] = useState(0)
  useEffect(() => {
    const app = document.querySelector('#App')
    if (!app) return
    if (app.clientWidth < app.clientHeight) {
      setWidth((app.clientWidth - xgaps) / columnCount)
    } else {
      setWidth((app.clientHeight - ygaps) / rowCount * tileAspect)
    }
  }, [])
  return width
}
