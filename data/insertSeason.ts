import type { Season } from '../types/Season'
import { database } from './database'

const statement = database.query(`
  INSERT OR IGNORE INTO seasons (id, title, airDate, gamesCount)
  VALUES ($id, $title, $airDate, $gamesCount)
`)

export function insertSeason(season: Season): void {
  statement.run({
    $id: season.id,
    $title: season.title,
    $airDate: season.airDate,
    $gamesCount: season.gamesCount,
  })
}
