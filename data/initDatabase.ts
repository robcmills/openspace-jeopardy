import { database } from './database'

function initSeasonsTable() {
  // First check if the seasons table exists
  const result = database
    .query(
      'SELECT name FROM sqlite_master WHERE type="table" AND name="seasons"',
    )
    .get()
  if (result) return
  // If the table does not exist, create it
  database
    .query(
      'CREATE TABLE seasons (id TEXT PRIMARY KEY, title TEXT, airDate TEXT, gamesCount TEXT)',
    )
    .run()
}

function initDatabase() {
  initSeasonsTable()
}

initDatabase()
