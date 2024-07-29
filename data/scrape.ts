import { fetchSeasons } from './fetchSeasons'
import { fetchSeasonsList } from './fetchSeasonsList'
import { initDatabase } from './initDatabase'
import { parseSeasons } from './parseSeasons'
import { parseSeasonsList } from './parseSeasonsList'

async function scrape() {
  console.log('Initializing database...')
  initDatabase()
  console.log('Fetching seasons list')
  await fetchSeasonsList()
  console.log('Parsing seasons list...')
  parseSeasonsList()
  console.log('Fetching seasons...')
  await fetchSeasons()
  console.log('Parsing seasons...')
  parseSeasons()
}

scrape()
