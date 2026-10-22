import { fetchEpisodes } from './fetchEpisodes'
import { fetchSeasons } from './fetchSeasons'
import { fetchSeasonsList } from './fetchSeasonsList'
import { initDatabase } from './initDatabase'
import { parseEpisodes } from './parseEpisodes'
import { parseSeasons } from './parseSeasons'
import { parseSeasonsList } from './parseSeasonsList'

// Usage: bun data/scrape.ts [--offline]
// Run from the repo root. Set DATABASE_PATH to write somewhere other than
// data/database.sqlite. --offline parses the cached html without fetching.
const isOffline = process.argv.includes('--offline')

async function scrape() {
  console.log('Initializing database...')
  initDatabase()
  if (!isOffline) {
    console.log('Fetching seasons list')
    await fetchSeasonsList()
  }
  console.log('Parsing seasons list...')
  parseSeasonsList()
  if (!isOffline) {
    console.log('Fetching seasons...')
    await fetchSeasons()
  }
  console.log('Parsing seasons...')
  parseSeasons()
  if (!isOffline) {
    console.log('Fetching episodes...')
    await fetchEpisodes()
  }
  console.log('Parsing episodes...')
  parseEpisodes()
}

scrape()
