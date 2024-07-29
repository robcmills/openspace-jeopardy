import { writeFileSync } from 'fs'

export async function fetchSeasonsList() {
  const response = await fetch('https://j-archive.com/listseasons.php')
  const text = await response.text()
  writeFileSync('data/seasons/list.html', text)
}
