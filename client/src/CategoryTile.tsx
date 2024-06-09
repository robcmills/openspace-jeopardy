import { LogoImage } from './LogoImage'
import { tileStyle } from './Tile';
import { useAtom, useAtomValue } from 'jotai';
import { boardSizeAtom } from './boardSizeAtom';
import { categoriesAtoms } from './categoriesAtoms';
import { socket } from './socket';
import { gameAtom } from './gameAtom';

interface CategoryTileProps {
  category: string;
  column: number;
}

export function CategoryTile({ category, column }: CategoryTileProps) {
  const game = useAtomValue(gameAtom)
  const boardSize = useAtomValue(boardSizeAtom)
  const tileStateAtom = categoriesAtoms[column]
  const [state, setState] = useAtom(tileStateAtom)

  const toggleState = () => {
    setState(state === 'logo' ? 'category' : 'logo')
    socket.emit('revealCategory', { column, gameId: game.id })
  }

  const content = state === 'logo' 
    ? <LogoImage />
    : category

  const style = {
    ...tileStyle,
    backgroundColor: state === 'logo'
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
