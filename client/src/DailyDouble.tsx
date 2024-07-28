import { CSSProperties, useEffect } from 'react'
import dailyDouble from './assets/daily-double.png'
import dailyDoubleSoundEffect from './assets/daily-double.mp3'

const audio = new Audio(dailyDoubleSoundEffect)

export function DailyDouble() {
  useEffect(() => {
    audio.play()
  }, [])
  const style: CSSProperties = {
    height: '100%',
    objectFit: 'cover',
    width: '100%',
  }
  return <img src={dailyDouble} style={style} />
}
