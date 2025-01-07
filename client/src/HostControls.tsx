import { CSSProperties } from 'react'
import { GameState } from './GameState'
import { HostCategoriesButton } from './HostCategoriesButton'
import { HostCorrectButtons } from './HostCorrectButtons'
import { HostCycleGameStateButton } from './HostCycleGameStateButton'
import { HostRevealMoneyTilesButton } from './HostRevealMoneyTilesButton'
import { useActiveContestant } from './useActiveContestant'
import { useGameState } from './useGameState'
import { useIsAnyClueVisible } from './useIsAnyClueVisible'

export function HostControls() {
  const activeContestant = useActiveContestant()
  const isAnyClueVisible = useIsAnyClueVisible()
  const { gameState } = useGameState()

  const question =
    activeContestant && activeContestant.contestant.question ? (
      <p>{activeContestant.contestant.question}</p>
    ) : null

  const wager =
    activeContestant && activeContestant.contestant.wager >= 0 ? (
      <p>Wager: ${activeContestant.contestant.wager.toLocaleString()}</p>
    ) : null

  const controlsStyle: CSSProperties = {
    alignItems: 'center',
    borderTop: '1px solid white',
    display: 'grid',
    gap: 8,
    gridTemplateColumns: 'auto 1fr auto',
    padding: 16,
  }

  const centerStyle: CSSProperties = {
    display: 'grid',
    gap: wager ? 8 : 0,
    gridTemplateRows: 'auto auto auto',
    justifyContent: 'center',
    placeItems: 'center',
    textAlign: 'center',
  }

  const isCorrectIncorrectButtonsVisible =
    (isAnyClueVisible && activeContestant) ||
    (gameState === GameState.FinalJeopardy &&
      activeContestant &&
      activeContestant.contestant.wager >= 0)

  // Ⅲ	3R	2162	8546	ROMAN NUMERAL THREE
  // ⅲ	3r	2172	8562	SMALL ROMAN NUMERAL THREE
  // ≡	=3	2261	8801	IDENTICAL TO

  return (
    <footer style={controlsStyle}>
      <HostCycleGameStateButton direction="previous" />
      <div style={centerStyle}>
        <HostRevealMoneyTilesButton />
        {question}
        {wager}
        {isCorrectIncorrectButtonsVisible && <HostCorrectButtons />}
        <HostCategoriesButton />
      </div>
      <HostCycleGameStateButton direction="next" />
    </footer>
  )
}
