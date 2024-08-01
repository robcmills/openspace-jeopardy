import { database } from './database'
import { existsSync, writeFileSync } from 'fs'
import { join } from 'path'

async function fetchEpisode(id: string) {
  const filePath = join('data', 'episodes', `${id}.html`)

  if (existsSync(filePath)) {
    console.log(`Episode ${id} already exists, skipping.`)
    return
  }

  try {
    const response = await fetch(
      `https://j-archive.com/showgame.php?game_id=${id}`,
    )
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    const html = await response.text()
    writeFileSync(`data/episodes/${id}.html`, html)
  } catch (error) {
    console.error(`Failed to fetch episode ${id}:`, error)
  }
}

export async function fetchEpisodes() {
  console.log('Fetching episodes...')
  const episodeIds = database.query('SELECT id FROM episodes').all() as {
    id: string
  }[]
  const results = await Promise.allSettled(
    episodeIds.map(({ id }) => fetchEpisode(id)),
  )

  const successful = results.filter(
    (result) => result.status === 'fulfilled',
  ).length
  const failed = results.filter(
    (result) => result.status !== 'fulfilled',
  ).length

  console.log(
    `Fetching completed.
      Successfully fetched ${successful} episodes,
      failed to fetch ${failed} episodes
      of ${results.length} total episodes.
    `,
  )
}
