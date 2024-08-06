import { database } from '../data/database'

let getAnswerQuery: ReturnType<typeof database.prepare> | null = null

type GetAnswerArgs = {
  column: number
  episodeId: string
  round: number
  row: number
}

export function getAnswer({ column, episodeId, round, row }: GetAnswerArgs) {
  if (getAnswerQuery === null) {
    getAnswerQuery = database.prepare(`
      select isDailyDouble, text from clues
      where column = $column
      and episodeId = $episodeId
      and round = $round
      and row = $row
    `)
  }
  const clue = getAnswerQuery.get({
    $column: column,
    $episodeId: episodeId,
    $round: round,
    $row: row,
  }) as { isDailyDouble: boolean; text: string }

  if (!clue) {
    console.error(
      `No clue found for column ${column} episodeId ${episodeId} round ${round} row ${row}`,
    )
    return null
  }

  return { answer: clue.text, isDailyDouble: clue.isDailyDouble }
}
