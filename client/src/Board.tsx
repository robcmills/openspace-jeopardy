import { CSSProperties } from 'react';
import { jeopardy } from './clues'
import { Column } from './Column'
import { Round } from './Round';
import { getFitDimensions } from './getFitDimensions';
import { boardAspect, tileGap } from './constants';

interface BoardProps {
  columns: typeof jeopardy;
  round: Round;
}

export function Board({ columns, round }: BoardProps) {
  const { height, width } = getFitDimensions({
    aspectRatio: boardAspect,
    height: window.innerHeight,
    width: window.innerWidth,
  })

  const style: CSSProperties = {
    gap: tileGap,
    height,
    width,
  }

  const columnNodes = columns.map((column, index) => {
    return (
      <Column
        boardWidth={width}
        column={column}
        index={index}
        key={column.category}
        round={round}
      />
    )
  })

  return (
    <div className='board' id='Board' style={style}>
      {columnNodes}
    </div>
  )
}
