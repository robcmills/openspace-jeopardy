import { jotaiStore } from './jotaiStore';
import fill from './assets/board-fill.mp3'
import { contestantsAtom } from './contestantsAtom';
import { activeContestantAtom } from './activeContestantAtom';

const audio = new Audio(fill)

const ACTIVATE_INTERVAL = 120

export function activateRandomContestant() {
  const { contestantsById } = jotaiStore.get(contestantsAtom)
  const contestantIds = Object.keys(contestantsById)

  if (contestantIds.length === 0) return
  if (contestantIds.length === 1) {
    jotaiStore.set(activeContestantAtom, contestantIds[0])
    return
  }

  audio.play()

  let prevIndex = -1
  const interval = setInterval(() => {
    let randomIndex = Math.floor(Math.random() * contestantIds.length)
    if (randomIndex === prevIndex) {
      if (randomIndex === 0) randomIndex++
      else if (randomIndex === contestantIds.length - 1) randomIndex--
      else randomIndex += Math.random() < 0.5 ? -1 : 1
    }
    jotaiStore.set(activeContestantAtom, contestantIds[randomIndex])
    prevIndex = randomIndex
  }, ACTIVATE_INTERVAL)

  setTimeout(() => {
    clearInterval(interval)
  }, 3600)
}
