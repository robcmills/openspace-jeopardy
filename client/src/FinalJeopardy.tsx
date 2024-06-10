import { CSSProperties, useRef } from 'react'
import finalJeopardySrc from './assets/final-jeopardy.jpg'
import { finalJeopardy } from './clues'
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
  const containerRef = useRef<HTMLDivElement>(null)

  const cycle = () => {
    if (!isHost) return
    const nextState = ({
      logo: 'category',
      category: 'answer',
      answer: 'logo',
    } as const)[state]
    setState(nextState)
    socket.emit('setFinalJeopardyState', {
      gameId: game.id,
      state: nextState,
    })
  }

  const containerStyle: CSSProperties = {
    display: 'grid',
    inset: 0,
    position: 'absolute',
  }

  const imgStyle: CSSProperties = {
    height: '100%',
    objectFit: 'contain',
    width: '100%',
  }

  const logo = <img src={finalJeopardySrc} style={imgStyle} />

  let fontSize = '18px'
  if (containerRef.current) {
    console.log('containerRef.current', containerRef.current)
    const containerRect = containerRef.current.getBoundingClientRect()
    console.log({ containerRect })
    fontSize = containerRect.width / 32 + 'px'
  }

  const style: CSSProperties = {
    ...typography,
    background: BLUE_BACKGROUND,
    display: 'grid',
    fontSize,
    padding: '4rem',
    placeItems: 'center',
  }

  const category = (
    <div style={style}>
      {finalJeopardy.category}
    </div>
  )

  const audioStyle: CSSProperties = {
    bottom: '1rem',
    height: '42px',
    position: 'absolute',
  }

  const answer = (
    <div style={style}>
      {finalJeopardy.answer}
      <audio id="theme" controls style={audioStyle}>
        <source src={finalJeopardyTheme} type="audio/mpeg" />
      </audio>
    </div>
  )

  const node = {
    logo,
    category,
    answer, 
  }[state]

  const left = (
    <div onClick={cycle} ref={containerRef} style={containerStyle}>
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
