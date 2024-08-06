import { database } from '../data/database'

let getCategoryQuery: ReturnType<typeof database.prepare> | null = null

type GetCategoryArgs = {
  column: number
  episodeId: string
  round: number
}

export function getCategory({ column, episodeId, round }: GetCategoryArgs) {
  if (getCategoryQuery === null) {
    getCategoryQuery = database.prepare(
      'select name from categories where episodeId = $episodeId and round = $round and column = $column',
    )
  }
  const category = getCategoryQuery.get({
    $episodeId: episodeId,
    $round: round,
    $column: column,
  }) as { name: string }

  if (!category) {
    console.error(`No category found for ${round}, ${column}`)
    return ''
  }

  return category.name
}
