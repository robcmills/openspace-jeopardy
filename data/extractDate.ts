export function extractDate(str: string) {
  const dateRegex = /(\d{4}-\d{2}-\d{2})/
  const match = str.match(dateRegex)
  return match ? match[1] : null
}
