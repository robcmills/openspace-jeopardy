import { writeFileSync } from 'fs'
import { database } from './database'

export async function fetchSeasons() {
  const seasonIds = database.query('SELECT id FROM seasons').all() as {
    id: string
  }[]
  for (const { id } of seasonIds) {
    console.log(`Fetching season ${id}...`)
    const response = await fetch(
      `https://j-archive.com/showseason.php?season=${id}`,
    )
    const text = await response.text()
    writeFileSync(`data/seasons/${id}.html`, text)
  }
}
