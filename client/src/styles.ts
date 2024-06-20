import { CSSProperties } from 'react'

export const absoluteFill: CSSProperties = {
  inset: 0,
  position: 'absolute',
}

export const ellipsify = {
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  whiteSpace: 'nowrap',
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

export const typography: CSSProperties = {
  color: 'white',
  fontWeight: 'bold',
  textAlign: 'center',
  textTransform: 'uppercase',
}
