import type { Category } from '../types/Category'
import { database } from './database'

let insertCategory: ReturnType<typeof database.prepare> | null = null

// Not idempotent
export const insertCategories = database.transaction(
  (categories: Category[]) => {
    if (insertCategory === null) {
      insertCategory = database.prepare(
        `INSERT INTO categories (
          column,
          comments,
          episodeId,
          id,
          name,
          round
        ) VALUES (
          $column,
          $comments,
          $episodeId,
          $id,
          $name,
          $round
        )`,
      )
    }
    for (const category of categories) {
      insertCategory.run({
        $column: category.column,
        $comments: category.comments,
        $episodeId: category.episodeId,
        $id: category.id,
        $name: category.name,
        $round: category.round,
      })
    }
  },
)
