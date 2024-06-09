import { LogoImage } from './LogoImage'
import { tileStyle } from './Tile';
import { useAtom, useAtomValue } from 'jotai';
import { boardSizeAtom } from './boardSizeAtom';
import { categoriesAtoms } from './categoriesAtoms';

interface CategoryTileProps {
  category: string;
  column: number;
}

export function CategoryTile({ category, column }: CategoryTileProps) {
  const boardSize = useAtomValue(boardSizeAtom)
  const tileStateAtom = categoriesAtoms[column]
  const [state, setState] = useAtom(tileStateAtom)

  const toggleState = () => {
    setState(state === 'logo' ? 'category' : 'logo')
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
