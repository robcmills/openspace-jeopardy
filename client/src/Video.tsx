import { useEffect, useRef } from 'react'
import intro from './assets/intro.mp4'
import { GameState } from './GameState'
import { useGameState } from './useGameState'
import { HostControls } from './HostControls'

const fullscreenStyle: React.CSSProperties = {
  display: 'grid',
  gridTemplateRows: '1fr auto',
  height: '100%',
  inset: 0,
  position: 'absolute',
  width: '100%',
}

const videoStyle: React.CSSProperties = {
  height: '100%',
  width: '100%',
}

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
    <div style={fullscreenStyle}>
      <video autoPlay ref={videoRef} controls style={videoStyle}>
        <source src={intro} type="video/mp4" />
      </video>
      <HostControls />
    </div>
  )
}
