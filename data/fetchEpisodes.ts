import { database } from './database'
import { existsSync } from 'fs'
import { CRAWL_DELAY_MS, fetchPage } from './fetchPage'

// Episodes already cached in data/episodes are not fetched again, so an
// interrupted run resumes where it left off.
export async function fetchEpisodes() {
  const episodeIds = database.query('SELECT id FROM episodes').all() as {
    id: string
  }[]
  const missingIds = episodeIds
    .map(({ id }) => id)
    .filter((id) => !existsSync(`data/episodes/${id}.html`))

  console.log(
    `${episodeIds.length} episodes, ${missingIds.length} not cached. ` +
      `Fetching takes about ${Math.ceil((missingIds.length * CRAWL_DELAY_MS) / 60_000)} minutes.`,
  )

  let fetched = 0
  let failed = 0
  for (const id of missingIds) {
    try {
      await fetchPage(
        `https://j-archive.com/showgame.php?game_id=${id}`,
        `data/episodes/${id}.html`,
      )
      fetched++
    } catch (error) {
      failed++
      console.error(`Failed to fetch episode ${id}:`, error)
    }
    console.log(
      `Fetched episode ${id} (${fetched + failed} of ${missingIds.length})`,
    )
  }

  console.log(`Fetched ${fetched} episodes, ${failed} failed.`)
}
