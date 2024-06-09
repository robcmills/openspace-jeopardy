import { useState } from 'react'
import { LogoImage } from './LogoImage'
import { tileStyle } from './Tile';
import { useAtomValue } from 'jotai';
import { boardSizeAtom } from './boardSizeAtom';

type CategoryTileState = 'logo' | 'category'

interface CategoryTileProps {
  category: string;
}

export function CategoryTile({ category }: CategoryTileProps) {
  const boardSize = useAtomValue(boardSizeAtom)
  const [state, setState] = useState<CategoryTileState>('logo')
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
