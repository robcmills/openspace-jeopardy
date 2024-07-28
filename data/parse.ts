import { readFileSync } from 'fs'
import { load } from 'cheerio'
import { insertSeason } from './insertSeason'
import type { Season } from '../types/Season'

function parseSeasonsList() {
  console.log('parsing seasons list...')
  const html = readFileSync('data/seasons/list.html', 'utf-8')
  const $ = load(html)
  $('table tr').each((_, tr) => {
    const season: Season = {
      id: '',
      title: '',
      airDate: '',
      gamesCount: '',
    }
    $(tr)
      .find('a')
      .each((_, a) => {
        const href = $(a).attr('href')
        if (!href) throw new Error('href not found')
        season.id = href.split('=')[1]
      })
    $(tr)
      .find('td')
      .each((i, td) => {
        const text = $(td).text()
        if (i === 0) {
          season.title = text
        } else if (i === 1) {
          season.airDate = text
        } else if (i === 2) {
          season.gamesCount = text
        }
      })
    insertSeason(season)
  })
}

function parse() {
  parseSeasonsList()
}

parse()
