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
      `CREATE TABLE seasons (
        id TEXT
        PRIMARY KEY,
        title TEXT,
        airDate TEXT,
        gamesCount TEXT
      )`,
    )
    .run()
}

function initEpisodesTable() {
  // First check if the episodes table exists
  const result = database
    .query(
      'SELECT name FROM sqlite_master WHERE type="table" AND name="episodes"',
    )
    .get()
  if (result) return
  // If the table does not exist, create it
  database
    .query(
      `CREATE TABLE episodes (
        airDate TEXT,
        anchorText TEXT,
        contestants TEXT,
        description TEXT,
        id TEXT PRIMARY KEY,
        number INTEGER,
        seasonId TEXT,
        tapedDate TEXT,
        FOREIGN KEY (seasonId) REFERENCES seasons(id)
      )`,
    )
    .run()
}

export function initDatabase() {
  initSeasonsTable()
  initEpisodesTable()
}
