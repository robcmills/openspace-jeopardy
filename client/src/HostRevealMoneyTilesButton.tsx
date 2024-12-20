import { GameState } from './GameState'
import { gameAtom } from './gameAtom'
import { revealTiles } from './revealTiles'
import { socket } from './socket'
import { useAtomValue } from 'jotai'
import { useGameState } from './useGameState'
import { useIsTilesLogoVisible } from './useIsTilesLogoVisible'

export function HostRevealMoneyTilesButton() {
  const game = useAtomValue(gameAtom)
  const { gameState } = useGameState()
  const isTilesLogoVisible = useIsTilesLogoVisible()

  if (
    !isTilesLogoVisible ||
    ![GameState.Jeopardy, GameState.DoubleJeopardy].includes(gameState)
  ) {
    return null
  }

  const onClick = () => {
    revealTiles()
    socket.emit('revealTiles', { gameId: game.id })
  }

  return <button onClick={onClick}>Reveal Tiles</button>
}
