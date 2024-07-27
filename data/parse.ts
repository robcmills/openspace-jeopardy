import { readFileSync } from 'fs'
import { load } from 'cheerio'

export function parse() {
  console.log('parsing seasons list...')
  const html = readFileSync('data/seasons/list.html', 'utf-8')
  const $ = load(html)
  $('table tr').each((_, tr) => {
    let seasonId = ''
    let title = ''
    let airDate = ''
    let gamesCount = ''
    $(tr)
      .find('a')
      .each((_, a) => {
        const href = $(a).attr('href')
        if (!href) throw new Error('href not found')
        seasonId = href.split('=')[1]
      })
    $(tr)
      .find('td')
      .each((i, td) => {
        const text = $(td).text()
        if (i === 0) {
          title = text
        } else if (i === 1) {
          airDate = text
        } else if (i === 2) {
          gamesCount = text
        }
      })
    console.log({ seasonId, title, airDate, gamesCount })
  })
}

parse()
