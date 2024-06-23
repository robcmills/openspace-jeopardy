import { LogoImage } from './LogoImage'
import { tileStyle } from './Tile';
import { useAtom, useAtomValue } from 'jotai';
import { boardSizeAtom } from './boardSizeAtom';
import { categoriesAtoms } from './categoriesAtoms';
import { socket } from './socket';
import { gameAtom } from './gameAtom';
import { useIsHost } from './useIsHost';

interface CategoryTileProps {
  column: number;
}

export function CategoryTile({ column }: CategoryTileProps) {
  const isHost = useIsHost()
  const game = useAtomValue(gameAtom)
  const boardSize = useAtomValue(boardSizeAtom)
  const tileStateAtom = categoriesAtoms[column]
  const [tileState, setTileState] = useAtom(tileStateAtom)

  const toggleState = () => {
    if (!isHost) return
    setTileState((prev) => ({
      ...prev,
      step: tileState.step === 'logo' ? 'category' : 'logo',
    }))
    socket.emit('revealCategory', { column, gameId: game.id })
  }

  const content = tileState.step === 'logo' 
    ? <LogoImage />
    : tileState.category

  const style = {
    ...tileStyle,
    backgroundColor: tileState.step === 'logo'
      ? 'black' :
      tileStyle.backgroundColor,
    fontSize: `${boardSize.height / 35}px`,
  }

  return (
    <div className='category tile' onClick={toggleState} style={style}>
      {content}
    </div>
  )
}
