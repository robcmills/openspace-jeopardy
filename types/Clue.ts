export type Clue = {
  column: number
  correctResponse: string
  episodeId: string
  id: string
  isDailyDouble: boolean
  // JSON array of media urls (images, audio, video) linked from the clue
  mediaUrls: string
  round: number
  row: number
  text: string
  // Board value of the clue's slot (not the Daily Double wager)
  value: number
}
