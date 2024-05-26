import { CSSProperties, useState } from 'react'
import finalJeopardySrc from './assets/final-jeopardy.jpg'
import { finalJeopardy } from './clues'
import { BLUE_BACKGROUND } from './colors'
import finalJeopardyTheme from './assets/final-jeopardy-theme.mp3'
import { GameLayout } from './GameLayout'
import { Side } from './Side'
import { typography } from './styles'

export type FinalJeopardyState = 'logo' | 'category' | 'answer'

export function FinalJeopardy() {
  const [state, setState] = useState<FinalJeopardyState>('logo')

  const cycle = () =>
    setState(({
      logo: 'category',
      category: 'answer',
      answer: 'logo',
    } as const)[state])

  const imgStyle: CSSProperties = {
    height: '100%',
    objectFit: 'contain',
    width: '100%',
  }

  const logo = <img src={finalJeopardySrc} style={imgStyle} />

  const style: CSSProperties = {
    ...typography,
    background: BLUE_BACKGROUND,
    display: 'grid',
    inset: 0,
    padding: '4rem',
    placeItems: 'center',
    position: 'absolute',
  }

  const category = (
    <div style={style}>
      {finalJeopardy.category}
    </div>
  )

  const audioStyle: CSSProperties = {
    bottom: '2rem',
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
    <div onClick={cycle}>
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
