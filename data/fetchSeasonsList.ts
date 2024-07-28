export async function fetchSeasonsList() {
  const response = await fetch('https://j-archive.com/listseasons.php')
  return await response.text()
}
