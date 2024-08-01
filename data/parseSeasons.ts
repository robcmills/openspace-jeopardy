import type { Episode } from '../types/Episode'
import { database } from './database'
import { extractDate } from './extractDate'
import { extractEpisodeNumber } from './extractEpisodeNumber'
import { insertEpisode } from './insertEpisode'
import { load } from 'cheerio'
import { readFileSync } from 'fs'

function parseSeason(seasonId: string) {
  console.log(`Parsing season ${seasonId}...`)
  const html = readFileSync(`data/seasons/${seasonId}.html`, 'utf-8')
  const $ = load(html)
  $('table tr').each((_, tr) => {
    const episode: Episode = {
      airDate: '',
      anchorText: '',
      contestants: '',
      description: '',
      id: '',
      number: 0,
      seasonId,
      tapedDate: '',
    }

    const anchor = $(tr).find('a').first()
    const href = $(anchor).attr('href')
    if (!href) throw new Error('href not found')
    episode.id = href.split('=')[1]
    const title = $(anchor).attr('title')
    if (title) {
      episode.tapedDate = title.split(' ')[1]
    }
    episode.anchorText = $(anchor).text()
    if (episode.anchorText.includes('taped')) {
      const maybeTapedDate = extractDate(episode.anchorText)
      if (maybeTapedDate) {
        episode.tapedDate = maybeTapedDate
      }
    }

    $(tr)
      .find('td')
      .each((i, td) => {
        const text = $(td).text().replace(/\n/g, '').trim()
        if (i === 0) {
          const maybeNumber = extractEpisodeNumber(text)
          if (maybeNumber) {
            episode.number = maybeNumber
          }
          if (text.includes('aired')) {
            const maybeAirDate = extractDate(text)
            if (maybeAirDate) {
              episode.airDate = maybeAirDate
            }
          }
        } else if (i === 1) {
          episode.contestants = text
        } else if (i === 2) {
          episode.description = text
        }
      })
    insertEpisode(episode)
  })
}

export function parseSeasons() {
  const seasonIds = database.query('SELECT id FROM seasons').all() as {
    id: string
  }[]
  for (const { id } of seasonIds) {
    parseSeason(id)
  }
}
