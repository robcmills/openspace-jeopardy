import { useEffect, useRef } from 'react'
import intro from './assets/intro.mp4'
import { GameState } from './GameState'

interface IntroProps {
  setState: (state: GameState) => void;
}

export function Intro({ setState }: IntroProps) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (video) {
      video.addEventListener('ended', () => {
      	setState(GameState.Logo)
      })
    }
  }, [])

  return (
    <video className='fullscreen' ref={videoRef} controls>
      <source src={intro} type="video/mp4" />
    </video>
  )
}
