import type { Category } from '../types/Category'
import type { Clue } from '../types/Clue'
import { database } from './database'
import { insertCategories } from './insertCategories'
import { insertClues } from './insertClues'
import { load, type Cheerio, type CheerioAPI } from 'cheerio'
import type { AnyNode } from 'domhandler'
import { randomId } from '../server/randomId'
import { readFileSync } from 'fs'
import {
  DEFAULT_ROUND_VALUES,
  FINAL_JEOPARDY_ROUND,
  ROUNDS,
  type Round,
} from '../client/src/Round'

// j-archive container ids for each board round, e.g.
// <div id="triple_jeopardy_round"> holding clues with ids like clue_TJ_1_1
const ROUND_CONTAINER_IDS: Record<Round, string> = {
  1: 'jeopardy_round',
  2: 'double_jeopardy_round',
  3: 'triple_jeopardy_round',
}

function parseDollars(text: string) {
  const value = parseInt(text.replace(/[^0-9]/g, ''), 10)
  return isNaN(value) ? null : value
}

// .text() drops <br />, which j-archive uses as a word separator in some
// clues (e.g. analogies), so turn line breaks into spaces first
function getText(element: Cheerio<AnyNode>) {
  element.find('br').replaceWith(' ')
  return element.text().replace(/\s+/g, ' ').trim()
}

function getMediaUrls($: CheerioAPI, element: Cheerio<AnyNode>) {
  const urls: string[] = []
  element.find('a[href*="/media/"]').each((_, a) => {
    const href = $(a).attr('href')
    if (href) urls.push(href)
  })
  return JSON.stringify(urls)
}

// Values differ by era and show (e.g. $100 or $200 top row in round 1,
// $300 in Celebrity Jeopardy's Triple Jeopardy round), so derive the value
// per row from the clues themselves. Daily Doubles show the wager instead
// of the slot value, so only regular clues count.
function getRowBaseValue(round: Round, rowValues: [number, number][]) {
  const counts = new Map<number, number>()
  for (const [row, value] of rowValues) {
    if (value % row !== 0) continue
    const base = value / row
    counts.set(base, (counts.get(base) || 0) + 1)
  }
  let best: number | null = null
  for (const [base, count] of counts) {
    if (best === null || count > (counts.get(best) || 0)) best = base
  }
  return best ?? DEFAULT_ROUND_VALUES[round][0]
}

function parseRound(round: Round, episodeId: string, $: CheerioAPI) {
  const container = $(`#${ROUND_CONTAINER_IDS[round]}`)
  if (container.length === 0) return

  const categories: Category[] = []
  container.find('td.category').each((column, td) => {
    const name = getText($(td).find('td.category_name'))
    const comments = getText($(td).find('td.category_comments'))
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
  const rowValues: [number, number][] = []
  container.find('td.clue').each((_, td) => {
    // Clues that were never revealed on the show are empty cells
    const clueText = $(td).find('td.clue_text[id]:not([id$="_r"])').first()
    if (clueText.length === 0) return
    // id is clue_{J,DJ,TJ}_{column}_{row}
    const parts = (clueText.attr('id') || '').split('_')
    const column = parseInt(parts[2])
    const row = parseInt(parts[3])
    if (isNaN(column) || isNaN(row)) return

    const isDailyDouble = $(td).find('.clue_value_daily_double').length > 0
    if (!isDailyDouble) {
      const value = parseDollars($(td).find('.clue_value').text())
      if (value !== null) rowValues.push([row, value])
    }

    clues.push({
      column,
      correctResponse: getText($(td).find('.correct_response')),
      episodeId,
      id: randomId(),
      isDailyDouble,
      mediaUrls: getMediaUrls($, clueText),
      round,
      row,
      text: getText(clueText),
      value: 0,
    })
  })

  const baseValue = getRowBaseValue(round, rowValues)
  for (const clue of clues) {
    clue.value = baseValue * clue.row
  }
  insertClues(clues)
}

function parseFinalJeopardy(episodeId: string, $: CheerioAPI) {
  // Scope to #clue_FJ: tiebreaker games have a second table.final_round
  const clue = $('#clue_FJ')
  if (clue.length === 0) return
  const categoryTable = $('#final_jeopardy_round table.final_round').first()
  insertCategories([
    {
      column: 0,
      comments: getText(categoryTable.find('.category_comments').first()),
      episodeId,
      id: randomId(),
      name: getText(categoryTable.find('.category_name').first()),
      round: FINAL_JEOPARDY_ROUND,
    },
  ])
  insertClues([
    {
      column: 1,
      correctResponse: getText($('#clue_FJ_r .correct_response')),
      episodeId,
      id: randomId(),
      isDailyDouble: false,
      mediaUrls: getMediaUrls($, clue),
      round: FINAL_JEOPARDY_ROUND,
      row: 1,
      text: getText(clue),
      value: 0,
    },
  ])
}

// Re-parsing an episode replaces its categories and clues
export const parseEpisode = database.transaction((episodeId: string) => {
  const html = readFileSync(`data/episodes/${episodeId}.html`, 'utf-8')
  const $ = load(html)
  database.run('DELETE FROM categories WHERE episodeId = ?', [episodeId])
  database.run('DELETE FROM clues WHERE episodeId = ?', [episodeId])
  for (const round of ROUNDS) {
    parseRound(round, episodeId, $)
  }
  parseFinalJeopardy(episodeId, $)
})

export function parseEpisodes() {
  const episodeIds = database.query('SELECT id FROM episodes').all() as {
    id: string
  }[]
  let parsed = 0
  let missing = 0
  for (const { id } of episodeIds) {
    try {
      parseEpisode(id)
      parsed++
    } catch (error) {
      missing++
      console.error(`Failed to parse episode ${id}:`, error)
    }
    if ((parsed + missing) % 500 === 0) {
      console.log(`Parsed ${parsed + missing} of ${episodeIds.length}`)
    }
  }
  console.log(`Parsed ${parsed} episodes, ${missing} failed or not fetched`)
}
