import { CSSProperties, useState } from 'react';
import { LogoImage } from './LogoImage';
import { useTileWidth, tileAspect } from './useTileWidth';

type CategoryTileState = 'logo' | 'category'

interface CategoryTileProps {
  category: string;
}

export function CategoryTile({ category }: CategoryTileProps) {
  const width = useTileWidth()

  const [state, setState] = useState<CategoryTileState>('logo')
  const toggleState = () => {
    setState(state === 'logo' ? 'category' : 'logo')
  }

  const content = state === 'logo' 
    ? <LogoImage />
    : category

  const style: CSSProperties = {
    height: width / tileAspect,
    width,
  }

  return (
    <div className='category tile' onClick={toggleState} style={style}>
      {content}
    </div>
  )
}
