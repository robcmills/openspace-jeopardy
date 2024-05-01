import { CSSProperties, useEffect, useRef, useState } from 'react'
import logo from './assets/openspace-jeopardy.jpg'
import theme from './assets/theme.mp3'

export function Logo() {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [scale, setScale] = useState(0)

  useEffect(() => {
    const audio = audioRef.current
    if (audio) {
      audio.currentTime = 9.5
      audio.play()
    }
    setScale(1)
  }, [])

  const imgStyle: CSSProperties = {
    transition: 'transform 1s',
    transform: `scale(${scale})`,
  }

  const audioStyle: CSSProperties = {
    position: 'absolute',
    bottom: '2rem',
  }

  return (
    <>
      <img className='fullscreen logo' src={logo} style={imgStyle} />
      <audio id="theme" controls ref={audioRef} style={audioStyle}>
      	<source src={theme} type="audio/mpeg" />
      </audio>
    </>
  )
}
