import { jotaiStore } from './jotaiStore'
import { timerAtom } from './timerAtom'
import timerMp3 from './assets/timer-end.mp3'

const timerAudio = new Audio(timerMp3)

let interval: NodeJS.Timeout | null = null

export function toggleTimer() {
  if (interval) {
    clearInterval(interval)
    interval = null
    jotaiStore.set(timerAtom, 0)
    return
  }
  jotaiStore.set(timerAtom, 5)
  interval = setInterval(() => {
    const timerValue = jotaiStore.get(timerAtom)
    console.log('interval', { timerValue })
    const nextValue = timerValue - 1
    if (nextValue === 0) {
      timerAudio.play()
      clearInterval(interval as NodeJS.Timeout)
      interval = null
    }
    jotaiStore.set(timerAtom, nextValue)
  }, 1000)
}
