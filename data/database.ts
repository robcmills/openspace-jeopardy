import { Database } from 'bun:sqlite'
import { join } from 'path'

export const database = new Database(join(__dirname, 'database.sqlite'))
