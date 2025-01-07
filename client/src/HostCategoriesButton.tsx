import { GameState } from './GameState'
import { categoryZoomAtom } from './categoryZoomAtom'
import { clamp } from './clamp'
import { gameAtom } from './gameAtom'
import { panCategories } from './panCategories'
import { revealCategory } from './revealCategory'
import { socket } from './socket'
import { useAtom, useAtomValue } from 'jotai'
import { useCategoryAtomValues } from './useCategoryAtomValues'
import { useGameState } from './useGameState'
import { useIsTilesLogoVisible } from './useIsTilesLogoVisible'
import { zoomInCategories, zoomOutCategories } from './zoomCategories'

export function HostCategoriesButton() {
  const game = useAtomValue(gameAtom)
  const { gameState } = useGameState()
  const isTilesLogoVisible = useIsTilesLogoVisible()
  const [zoomColumn, setZoomColumn] = useAtom(categoryZoomAtom)
  const categoryAtomValues = useCategoryAtomValues()

  const { category, step } = categoryAtomValues[clamp(zoomColumn, 0, 5)]
  const isCategoryRevealed = step === 'category'
  const isAllCategoriesRevealed = categoryAtomValues.every(
    (categoryAtomValue) => categoryAtomValue.step === 'category',
  )

  if (
    isTilesLogoVisible ||
    ![GameState.Jeopardy, GameState.DoubleJeopardy].includes(gameState) ||
    (isAllCategoriesRevealed && zoomColumn < 0)
  ) {
    return null
  }

  let label = 'Zoom Categories'
  if (zoomColumn >= 0 && zoomColumn < 6 && !isCategoryRevealed) {
    label = 'Reveal Category'
  } else if (zoomColumn >= 0 && zoomColumn < 5 && isCategoryRevealed) {
    label = 'Next Category'
  }

  const onClick = () => {
    if (label === 'Zoom Categories') {
      if (zoomColumn < 0) {
        zoomInCategories()
        socket.emit('zoomCategories', { direction: 'in', gameId: game.id })
        setZoomColumn(0)
      } else {
        zoomOutCategories()
        socket.emit('zoomCategories', { direction: 'out', gameId: game.id })
        setZoomColumn(-1)
      }
    } else if (label === 'Reveal Category') {
      revealCategory({ category, column: zoomColumn })
    } else if (label === 'Next Category') {
      panCategories()
      socket.emit('panCategories', { gameId: game.id })
      setZoomColumn(clamp(zoomColumn + 1, 0, 5))
    }
  }

  return <button onClick={onClick}>{label}</button>
}
