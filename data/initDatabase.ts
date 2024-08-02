import { database } from './database'

function createCategoriesTable() {
  database.run(
    `CREATE TABLE IF NOT EXISTS categories (
        column INTEGER,
        comments TEXT,
        episodeId TEXT,
        id TEXT PRIMARY KEY,
        name TEXT,
        round INTEGER,
        FOREIGN KEY (episodeId) REFERENCES episodes(id)
      )`,
  )
}

function createCategoriesIndex() {
  database.run(
    'CREATE INDEX IF NOT EXISTS idx_categories_episodeId ON categories(episodeId)',
  )
}

function createEpisodesTable() {
  database.run(
    `CREATE TABLE IF NOT EXISTS episodes (
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
}

function createEpisodesIndex() {
  database.run(
    'CREATE INDEX IF NOT EXISTS idx_episodes_seasonId ON episodes(seasonId)',
  )
}

function createSeasonsTable() {
  database.run(
    `CREATE TABLE IF NOT EXISTS seasons (
        airDate TEXT,
        gamesCount TEXT,
        id TEXT PRIMARY KEY,
        title TEXT
      )`,
  )
}

export function initDatabase() {
  database.exec('PRAGMA journal_mode = WAL;')
  createSeasonsTable()
  createEpisodesTable()
  createEpisodesIndex()
  createCategoriesTable()
  createCategoriesIndex()
}
