import { jotaiStore } from './jotaiStore'
import { timerAtom } from './timerAtom'
import timerMp3 from './assets/timer-end.mp3'

const timerAudio = new Audio(timerMp3)

let interval: Timer | null = null

export function clearTimer() {
  if (interval) {
    clearInterval(interval)
    interval = null
  }
  jotaiStore.set(timerAtom, 0)
}

export function restartTimer() {
  clearTimer()
  toggleTimer()
}

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
    const nextValue = timerValue - 1
    if (nextValue === 0) {
      timerAudio.play()
      if (interval) clearInterval(interval)
      interval = null
    }
    jotaiStore.set(timerAtom, nextValue)
  }, 1000)
}
