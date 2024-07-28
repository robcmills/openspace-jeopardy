import { LogoImage } from './LogoImage'
import { tileStyle } from './Tile'
import { useAtom, useAtomValue } from 'jotai'
import { boardSizeAtom } from './boardSizeAtom'
import { categoriesAtoms } from './categoriesAtoms'
import { socket } from './socket'
import { gameAtom } from './gameAtom'
import { useIsHost } from './useIsHost'
import { CategoryTileState } from './CategoryTileState'

interface CategoryTileProps {
  column: number
}

export function CategoryTile({ column }: CategoryTileProps) {
  const isHost = useIsHost()
  const game = useAtomValue(gameAtom)
  const boardSize = useAtomValue(boardSizeAtom)
  const categoryAtom = categoriesAtoms[column]
  const [categoryState, setCategoryState] = useAtom(categoryAtom)

  const toggleState = () => {
    if (!isHost) return
    const nextStep = categoryState.step === 'logo' ? 'category' : 'logo'
    const nextState: CategoryTileState = {
      ...categoryState,
      step: nextStep,
    }
    setCategoryState(nextState)
    socket.emit('setCategoryState', {
      column,
      gameId: game.id,
      state: nextState,
    })
  }

  const content =
    categoryState.step === 'logo' ? <LogoImage /> : categoryState.category

  const style = {
    ...tileStyle,
    backgroundColor:
      categoryState.step === 'logo' ? 'black' : tileStyle.backgroundColor,
    fontSize: `${boardSize.height / 35}px`,
  }

  return (
    <div className="category tile" onClick={toggleState} style={style}>
      {content}
    </div>
  )
}
