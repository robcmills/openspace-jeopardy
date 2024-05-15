import { useEffect, useRef } from 'react'
import intro from './assets/intro.mp4'
import { GameState } from './GameState'

interface IntroProps {
  setGameState: (gameState: GameState) => void;
}

export function Intro({ setGameState }: IntroProps) {
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (video) {
      video.addEventListener('ended', () => {
        setGameState(GameState.Logo)
      })
    }
  }, [])

  return (
    <video className='fullscreen' ref={videoRef} controls>
      <source src={intro} type='video/mp4' />
    </video>
  )
}
