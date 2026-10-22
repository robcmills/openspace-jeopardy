import { renameSync, writeFileSync } from 'fs'

// j-archive.com/robots.txt asks for a 20 second crawl delay
const CRAWL_DELAY_MS = 20_000

let lastFetchAt = 0

// Fetch a j-archive page and write it to filePath, waiting between
// requests. Writes to a temp file first so an interrupted run never
// leaves a truncated page in the cache.
export async function fetchPage(url: string, filePath: string) {
  const wait = lastFetchAt + CRAWL_DELAY_MS - Date.now()
  if (wait > 0) await Bun.sleep(wait)
  lastFetchAt = Date.now()
  const response = await fetch(url, {
    headers: {
      'User-Agent':
        'jeopardyweb.app scraper (https://github.com/robcmills/openspace-jeopardy)',
    },
  })
  if (!response.ok) {
    throw new Error(`HTTP ${response.status} for ${url}`)
  }
  const html = await response.text()
  const tempPath = `${filePath}.tmp`
  writeFileSync(tempPath, html)
  renameSync(tempPath, filePath)
  return html
}
