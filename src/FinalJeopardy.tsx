import { CSSProperties, useState } from 'react'
import finalJeopardySrc from './assets/final-jeopardy.jpg'
import { finalJeopardy } from './clues'
import { BLUE_BACKGROUND } from './colors'
import finalJeopardyTheme from './assets/final-jeopardy-theme.mp3'

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

  const style: CSSProperties = {
    background: BLUE_BACKGROUND,
    color: 'white',
    display: 'grid',
    fontSize: '3rem',
    fontWeight: 'bold',
    inset: 0,
    padding: '4rem',
    placeItems: 'center',
    position: 'absolute',
    textAlign: 'center',
    textShadow: 'black 4px 4px 0px',
    textTransform: 'uppercase',
  }

  const audioStyle: CSSProperties = {
    bottom: '4rem',
    position: 'absolute',
  }

  const category = (
    <div style={style}>
      {finalJeopardy.category}
      <audio id="theme" controls style={audioStyle}>
        <source src={finalJeopardyTheme} type="audio/mpeg" />
      </audio>
    </div>
  )

  const node = {
    logo: <img src={finalJeopardySrc} style={imgStyle} />,
    category,
    answer: <div style={style}>{finalJeopardy.answer}</div>,
  }[state]

  return (
    <div onClick={cycle}>
      {node}
    </div>
  )
}
