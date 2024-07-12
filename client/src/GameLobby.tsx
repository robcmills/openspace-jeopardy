import { CSSProperties } from 'react'
import logo from './assets/openspace-jeopardy.jpg'
import theme from './assets/theme.mp3'
import { absoluteFill } from './styles'
import { GameLayout } from './GameLayout'
import { Side } from './Side'

const imgStyle: CSSProperties = {
  ...absoluteFill,
  height: '100%',
  objectFit: 'contain',
  width: '100%',
}

const audioStyle: CSSProperties = {
  bottom: '2rem',
  left: '2rem',
  position: 'absolute',
}

export function GameLobby() {
  const left = (
    <>
      <img src={logo} style={imgStyle} />
      <audio autoPlay id="theme" controls style={audioStyle}>
        <source src={theme} type="audio/mpeg" />
      </audio>
    </>
  )

  return (
    <GameLayout
      left={left}
      right={<Side />}
    />
  )
}
