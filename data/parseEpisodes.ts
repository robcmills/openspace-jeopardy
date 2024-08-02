import { randomId } from '../server/randomId'
import type { Category } from '../types/Category'
import { database } from './database'
import { insertCategories } from './insertCategories'
import { load, type CheerioAPI } from 'cheerio'
import { readFileSync } from 'fs'

function parseRound(round: number, episodeId: string, $: CheerioAPI) {
  const containerId = `#${round === 2 ? 'double_' : ''}jeopardy_round`

  const categories: Category[] = []
  $(`${containerId} td.category`).each((column, td) => {
    const name = $(td).find('td.category_name').text()
    const comments = $(td).find('td.category_comments').text()
    categories.push({
      column,
      comments,
      episodeId,
      id: randomId(),
      name,
      round,
    })
  })
  insertCategories(categories)
}

function parseEpisode(id: string) {
  console.log(`Parsing episode ${id}...`)
  const html = readFileSync(`data/episodes/${id}.html`, 'utf-8')
  const $ = load(html)
  parseRound(1, id, $)
  parseRound(2, id, $)
}

export function parseEpisodes() {
  const episodeIds = database.query('SELECT id FROM episodes').all() as {
    id: string
  }[]
  for (const { id } of episodeIds) {
    parseEpisode(id)
  }
}
