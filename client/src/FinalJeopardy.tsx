import { CSSProperties, useEffect, useRef } from 'react'
import finalJeopardySrc from './assets/final-jeopardy.jpg'
import { BLUE_BACKGROUND } from './colors'
import finalJeopardyTheme from './assets/final-jeopardy-theme.mp3'
import { GameLayout } from './GameLayout'
import { Side } from './Side'
import { typography } from './styles'
import { useIsHost } from './useIsHost'
import { socket } from './socket'
import { useAtom, useAtomValue } from 'jotai'
import { gameAtom } from './gameAtom'
import { finalJeopardyAtom } from './finalJeopardyAtom'

export function FinalJeopardy() {
  const isHost = useIsHost()
  const game = useAtomValue(gameAtom)
  const [state, setState] = useAtom(finalJeopardyAtom)

  const audioRef = useRef<HTMLAudioElement>(null)

  const cycle = () => {
    if (!isHost) return
    const nextStep = ({
      logo: 'category',
      category: 'answer',
      answer: 'logo',
    } as const)[state.step]
    setState((prev) => ({
      ...prev,
      step: nextStep,
    }))
    socket.emit('setFinalJeopardyState', {
      gameId: game.id,
      state: {
        ...state,
        step: nextStep,
      },
    })
  }

  useEffect(() => {
    const audio = audioRef.current
    if (audio) {
      audio.addEventListener('ended', () => {
        cycle()
      })
    }
  }, [])

  const containerStyle: CSSProperties = {
    display: 'grid',
    inset: 0,
    position: 'absolute',
  }

  const imgStyle: CSSProperties = {
    height: '100%',
    objectFit: 'contain',
    position: 'absolute',
    width: '100%',
  }

  const logo = <img src={finalJeopardySrc} style={imgStyle} />

  const style: CSSProperties = {
    ...typography,
    background: BLUE_BACKGROUND,
    display: 'grid',
    fontSize: '18px',
    padding: '1rem',
    placeItems: 'center',
  }

  const category = (
    <div style={style}>
      {state.category}
    </div>
  )

  const audioStyle: CSSProperties = {
    bottom: '1rem',
    height: '42px',
    position: 'absolute',
  }

  const answer = (
    <div style={style}>
      {state.answer}
      <audio id="theme" controls={isHost} ref={audioRef} style={audioStyle}>
        <source src={finalJeopardyTheme} type="audio/mpeg" />
      </audio>
    </div>
  )

  const node = {
    logo,
    category,
    answer, 
  }[state.step]

  const left = (
    <div onClick={cycle} style={containerStyle}>
      {node}
    </div>
  )

  return (
    <GameLayout
      left={left}
      right={<Side />}
    />
  )
}
