import { CSSProperties, ReactNode, useEffect, useState } from 'react';
import { Column } from './Column'
import { Round } from './Round';
import { getFitDimensions } from './getFitDimensions';
import { boardAspect } from './constants';
import { useAtom } from 'jotai';
import { boardSizeAtom } from './boardSizeAtom';

interface BoardProps {
  round: Round;
}

export function Board({ round }: BoardProps) {
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
    boxSizing: 'border-box',
    display: 'grid',
    gridTemplateColumns: 'repeat(6, 1fr)',
    height: height || '100%',
    justifyContent: 'stretch',
    transition: 'transform 1s',
    width: width || '100%',
  }

  const columnNodes: ReactNode[] = []
  for (let i = 0; i < 6; i++) {
    columnNodes.push(<Column index={i} key={i} round={round} />)
  }

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
