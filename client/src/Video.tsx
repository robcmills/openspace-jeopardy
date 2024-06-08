import { useEffect, useRef } from 'react'
import intro from './assets/intro.mp4'
import { GameState } from './GameState'
import { useGameState } from './useGameState'

export function Video() {
  const { setGameState } = useGameState()
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (video) {
      video.addEventListener('ended', () => {
        setGameState(GameState.Jeopardy)
      })
    }
  }, [])

  return (
    <video className='fullscreen' ref={videoRef} controls>
      <source src={intro} type='video/mp4' />
    </video>
  )
}
