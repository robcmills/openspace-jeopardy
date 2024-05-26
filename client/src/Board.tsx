import { CSSProperties, useEffect, useState } from 'react';
import { jeopardy } from './clues'
import { Column } from './Column'
import { Round } from './Round';
import { getFitDimensions } from './getFitDimensions';
import { boardAspect } from './constants';
import { useAtom } from 'jotai';
import { boardSizeAtom } from './boardSizeAtom';

interface BoardProps {
  columns: typeof jeopardy;
  round: Round;
}

export function Board({ columns, round }: BoardProps) {
  const [boardSize, setBoardSize] = useAtom(boardSizeAtom)
  const [boardElement, setBoardElement] =
    useState<HTMLElement | null>(null)

  useEffect(() => {
    if (!boardElement) return
    const rect = boardElement.getBoundingClientRect()
    setBoardSize(getFitDimensions({
      aspectRatio: boardAspect,
      height: rect.height,
      width: rect.width,
    }))
  }, [boardElement])

  const { height, width } = boardSize

  const boardStyle: CSSProperties = {
    alignItems: 'stretch',
    backgroundColor: 'hsl(0, 0%, 10%)',
    border: '1px solid white',
    boxSizing: 'border-box',
    display: 'grid',
    gridTemplateColumns: 'repeat(6, 1fr)',
    height: height || '100%',
    justifyContent: 'stretch',
    transition: 'transform 1s',
    width: width || '100%',
  }

  const columnNodes = columns.map((column, index) => {
    return (
      <Column
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
      ref={setBoardElement}
      style={boardStyle}
    >
      {columnNodes}
    </div>
  )
}
