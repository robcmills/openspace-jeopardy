import { CSSProperties, useEffect, useRef } from 'react'
import logo from './assets/openspace-jeopardy.jpg'
import theme from './assets/theme.mp3'
import { absoluteFill } from './styles'

const imgStyle: CSSProperties = {
  ...absoluteFill,
  objectFit: 'contain',
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
      <img className='fullscreen logo' src={logo} style={imgStyle} />
      <audio id="theme" controls ref={audioRef} style={audioStyle}>
      	<source src={theme} type="audio/mpeg" />
      </audio>
    </>
  )
}
