import { useState } from 'react';
import { LogoImage } from './LogoImage';

type CategoryTileState = 'logo' | 'category'

interface CategoryTileProps {
  category: string;
}

export function CategoryTile({ category }: CategoryTileProps) {
  const [state, setState] = useState<CategoryTileState>('logo')
  const toggleState = () => {
    setState(state === 'logo' ? 'category' : 'logo')
  }
  const content = state === 'logo' 
    ? <LogoImage />
    : category
  return (
    <div className='category tile' onClick={toggleState}>
      {content}
    </div>
  )
}
