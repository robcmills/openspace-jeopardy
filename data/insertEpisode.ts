import type { Episode } from '../types/Episode'
import { database } from './database'

export function insertEpisode(episode: Episode) {
  database
    .query(
      `
    INSERT OR IGNORE INTO episodes (
      airDate,
      anchorText,
      contestants,
      description,
      id,
      number,
      seasonId,
      tapedDate
    ) VALUES (
      $airDate,
      $anchorText,
      $contestants,
      $description,
      $id,
      $number,
      $seasonId,
      $tapedDate
    )
  `,
    )
    .run({
      $airDate: episode.airDate,
      $anchorText: episode.anchorText,
      $contestants: episode.contestants,
      $description: episode.description,
      $id: episode.id,
      $number: episode.number,
      $seasonId: episode.seasonId,
      $tapedDate: episode.tapedDate,
    })
}
