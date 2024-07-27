import { writeFileSync } from 'fs'
import { fetchSeasonsList } from './fetchSeasonsList'

async function scrape() {
  console.log('Scraping...')
  const seasonsList = await fetchSeasonsList()
  writeFileSync('data/seasons/list.html', seasonsList)
}

scrape()
