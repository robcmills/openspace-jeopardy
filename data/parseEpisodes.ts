import { database } from './database'

function parseEpisode(id: string) {
  console.log(`Parsing episode ${id}...`)
}

export function parseEpisodes() {
  const episodeIds = database.query('SELECT id FROM episodes').all() as {
    id: string
  }[]
  for (const { id } of [episodeIds[0]]) {
    parseEpisode(id)
  }
}
