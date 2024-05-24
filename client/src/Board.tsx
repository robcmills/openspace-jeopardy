import { CSSProperties } from 'react';
import { jeopardy } from './clues'
import { Column } from './Column'
import { Round } from './Round';
import { getFitDimensions } from './getFitDimensions';
import { boardAspect, tileGap } from './constants';

interface BoardProps {
  columns: typeof jeopardy;
  containerElement: HTMLElement | null;
  round: Round;
}

export function Board({ columns, containerElement, round }: BoardProps) {
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
    // height: fit.height,
    // width: fit.width,
  }
  if (fit.height) boardStyle.height = fit.height
  if (fit.width) boardStyle.width = fit.width

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
      style={boardStyle}
    >
      board
      {false && columnNodes}
    </div>
  )
}
