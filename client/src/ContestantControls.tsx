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

  if (gameState === GameState.FinalJeopardy) {
    return finalJeopardyState.step === 'answer' ? (
      <ContestantWagerForm contestant={contestant.contestant} />
    ) : null
  }

  if (isDailyDouble && isActiveContestant) {
    return <ContestantWagerForm contestant={contestant.contestant} />
  }

  return <ContestantBuzzer />
}
