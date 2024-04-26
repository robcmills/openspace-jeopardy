import { useEffect, useRef, useState } from 'react'
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

  const style = {
    transition: 'transform 1s',
    transform: `scale(${scale})`,
  }

  return (
    <>
      <img className='fullscreen logo' src={logo} style={style} />
      <audio id="theme" controls ref={audioRef}>
      	<source src={theme} type="audio/mpeg" />
      </audio>
    </>
  )
}
