import type { Category } from '../types/Category'
import type { Clue } from '../types/Clue'
import { database } from './database'
import { insertCategories } from './insertCategories'
import { insertClues } from './insertClues'
import { load, type CheerioAPI } from 'cheerio'
import { randomId } from '../server/randomId'
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

  const clues: Clue[] = []
  $(`${containerId} td.clue`).each((_, td) => {
    let column = 1
    let row = 1
    let correctResponse = ''
    let text = ''
    $(td)
      .find('.clue_text')
      .each((_, clueTextElement) => {
        const id = clueTextElement.attribs.id
        const parts = id.split('_')
        column = parseInt(parts[2])
        row = parseInt(parts[3])
        const isResponse = parts[4] === 'r'
        if (isResponse) {
          correctResponse = $(td).find('.correct_response').text()
        } else {
          text = $(clueTextElement).text()
        }
      })
    const isDailyDouble = $(td).find('.clue_value_daily_double').length > 0
    clues.push({
      column,
      correctResponse,
      episodeId,
      id: randomId(),
      isDailyDouble,
      round,
      row,
      text,
    })
  })
  insertClues(clues)
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
