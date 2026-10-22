import { fetchPage } from './fetchPage'

export async function fetchSeasonsList() {
  await fetchPage(
    'https://j-archive.com/listseasons.php',
    'data/seasons/list.html',
  )
}
