import { existsSync, readFileSync } from 'fs'
import { database } from './database'
import { fetchPage } from './fetchPage'

function countCachedGames(filePath: string) {
  const html = readFileSync(filePath, 'utf-8')
  return new Set(html.match(/showgame\.php\?game_id=\d+/g)).size
}

// Only fetch seasons that are new or whose archived game count changed
export async function fetchSeasons() {
  const seasons = database
    .query('SELECT id, gamesCount FROM seasons')
    .all() as {
    id: string
    gamesCount: string
  }[]
  for (const { id, gamesCount } of seasons) {
    const filePath = `data/seasons/${id}.html`
    const expected = parseInt(gamesCount.replace(/[^0-9]/g, ''), 10)
    if (existsSync(filePath) && countCachedGames(filePath) === expected) {
      continue
    }
    console.log(`Fetching season ${id}...`)
    try {
      await fetchPage(
        `https://j-archive.com/showseason.php?season=${id}`,
        filePath,
      )
    } catch (error) {
      console.error(`Failed to fetch season ${id}:`, error)
    }
  }
}
