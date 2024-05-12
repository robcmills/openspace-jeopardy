import { CSSProperties, useState } from 'react'
import { LogoImage } from './LogoImage'

type CategoryTileState = 'logo' | 'category'

interface CategoryTileProps {
  category: string;
  height: number;
  width: number;
}

export function CategoryTile({ category, height, width }: CategoryTileProps) {
  const [state, setState] = useState<CategoryTileState>('logo')
  const toggleState = () => {
    setState(state === 'logo' ? 'category' : 'logo')
  }

  const content = state === 'logo' 
    ? <LogoImage />
    : category

  const style: CSSProperties = {
    height,
    width,
  }

  return (
    <div className='category tile' onClick={toggleState} style={style}>
      {content}
    </div>
  )
}
