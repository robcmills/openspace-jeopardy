import type { Clue } from '../types/Clue'
import { database } from './database'

let insertClue: ReturnType<typeof database.prepare> | null = null

// Not idempotent
export const insertClues = database.transaction((clues: Clue[]) => {
  if (insertClue === null) {
    insertClue = database.prepare(
      `INSERT INTO clues (
          column,
          correctResponse,
          episodeId,
          id,
          isDailyDouble,
          round,
          row,
          text
        ) VALUES (
          $column,
          $correctResponse,
          $episodeId,
          $id,
          $isDailyDouble,
          $round,
          $row,
          $text
        )`,
    )
  }
  for (const clue of clues) {
    insertClue.run({
      $column: clue.column,
      $correctResponse: clue.correctResponse,
      $episodeId: clue.episodeId,
      $id: clue.id,
      $isDailyDouble: clue.isDailyDouble,
      $round: clue.round,
      $row: clue.row,
      $text: clue.text,
    })
  }
})
