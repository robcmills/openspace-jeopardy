import { CSSProperties } from 'react'
import logo from './assets/openspace-jeopardy.jpg'

export function LogoImage() {
  const style: CSSProperties = {
    height: 'auto',
    objectFit: 'contain',
    width: '100%',
  }
  return (
    <img src={logo} style={style} />
  )
}
