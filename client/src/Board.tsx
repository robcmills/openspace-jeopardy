import { CSSProperties, useState } from 'react';
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
  const [containerElement, setContainerElement] =
    useState<HTMLElement | null>(null)

  const { height, width } = containerElement
    ? containerElement.getBoundingClientRect()
    : { height: 0, width: 0 }
  const fit = getFitDimensions({
    aspectRatio: boardAspect,
    height,
    width,
  })
  console.log('fit', fit)

  const boardStyle: CSSProperties = {
    gap: tileGap,
    height: fit.height || '100%',
    width: fit.width || '100%',
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
    <div
      className='board'
      id='Board'
      ref={setContainerElement}
      style={boardStyle}
    >
      board
      {false && columnNodes}
    </div>
  )
}
