import { CSSProperties, useEffect, useRef } from 'react'
import logo from './assets/openspace-jeopardy.jpg'
import theme from './assets/theme.mp3'
import { absoluteFill } from './styles'

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
  const audioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    const audio = audioRef.current
    if (audio) audio.play()
  }, [])

  return (
    <>
      <img src={logo} style={imgStyle} />
      <audio autoPlay id="theme" controls ref={audioRef} style={audioStyle}>
      	<source src={theme} type="audio/mpeg" />
      </audio>
    </>
  )
}
