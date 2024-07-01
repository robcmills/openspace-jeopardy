import { useContestant } from './useContestant'
import { useAtomValue } from 'jotai'
import { ContestantWagerForm } from './ContestantWagerForm'
import { useIsDailyDouble } from './useIsDailyDouble'
import { useGameState } from './useGameState'
import { GameState } from './GameState'
import { finalJeopardyAtom } from './finalJeopardyAtom'
import { socketAtom } from './socketAtom'
import { useActiveContestant } from './useActiveContestant'
import { ContestantBuzzer } from './ContestantBuzzer'

export function ContestantControls() {
  const activeContestant = useActiveContestant()
  const contestant = useContestant()
  const { gameState } = useGameState()
  const finalJeopardyState = useAtomValue(finalJeopardyAtom)
  const { userId } = useAtomValue(socketAtom)
  const isActiveContestant = activeContestant?.user.id === userId
  const isDailyDouble = useIsDailyDouble()

  if (!contestant) return null

  if (
    (isDailyDouble && isActiveContestant) ||
    contestant?.contestant.wager &&
    !contestant?.contestant.question
  ) {
    return <ContestantWagerForm contestant={contestant.contestant} />
  }

  if (gameState === GameState.FinalJeopardy) {
    if (finalJeopardyState.step === 'answer') {
      return <ContestantWagerForm contestant={contestant.contestant} />
    }
    return null
  }

  return <ContestantBuzzer />
}
