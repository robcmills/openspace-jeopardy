import { CategoryTile } from './CategoryTile';
import { Round } from './Round';
import { Tile } from './Tile';
import { jeopardy } from './clues'

interface ColumnProps {
  column: typeof jeopardy[0];
  index: number;
  round: Round;
}

export function Column({ column, index, round }: ColumnProps) {
  const categoryTile =
    <CategoryTile category={column.category} column={index} />

  const clueTiles = column.items.map((item, row) =>
    <Tile
      column={index}
      item={item}
      key={`${index}-${row}`}
      round={round}
      row={row}
    />
  )

  const columnStyle = {
    display: 'grid',
    gridTemplateRows: 'repeat(6, 1fr)',
    placeContent: 'stretch',
    placeItems: 'stretch',
  }

  return (
    <div style={columnStyle}>
      {categoryTile}
      {clueTiles}
    </div>
  )
}
