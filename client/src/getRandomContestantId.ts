import { contestantsAtom } from './contestantsAtom'
import { jotaiStore } from './jotaiStore'

export function getRandomContestantId() {
  const { contestantsById } = jotaiStore.get(contestantsAtom)
  const contestantIds = Object.keys(contestantsById)
  const randomIndex = Math.floor(Math.random() * contestantIds.length)
  console.log(
    'randomContestant',
    contestantsById[contestantIds[randomIndex]]
  )
  return contestantIds[randomIndex]
}
