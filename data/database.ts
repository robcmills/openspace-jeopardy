import { Database } from 'bun:sqlite'
import { join, resolve } from 'path'

// DATABASE_PATH lets the scraper build a fresh database file without
// touching the one the server reads.
const path = process.env.DATABASE_PATH
  ? resolve(process.env.DATABASE_PATH)
  : join(__dirname, 'database.sqlite')

export const database = new Database(path)
