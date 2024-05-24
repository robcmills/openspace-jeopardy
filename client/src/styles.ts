import { CSSProperties } from 'react'

export const absoluteFill: CSSProperties = {
  inset: 0,
  position: 'absolute',
}

export const gridCenter: CSSProperties = {
  display: 'grid',
  placeContent: 'center',
  placeItems: 'center',
}

export const centerFill: CSSProperties = {
  ...absoluteFill,
  ...gridCenter,
}
