export function extractEpisodeNumber(text: string) {
  const match = text.match(/#(\d+)/)
  return match ? parseInt(match[1], 10) : null
}
