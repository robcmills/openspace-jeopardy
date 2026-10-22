import { database } from '../data/database'
import {
  DEFAULT_ROUND_VALUES,
  FINAL_JEOPARDY_ROUND,
  type Round,
} from '../client/src/Round'
import type { GameRound } from '../types/GameRound'

let getValuesQuery: ReturnType<typeof database.prepare> | null = null
let getFinalJeopardyQuery: ReturnType<typeof database.prepare> | null = null

// Which board rounds an episode has, and the value of each row. Episodes
// not in the database (e.g. no episode id) get a standard two round game.
export function getEpisodeRounds(episodeId: string) {
  if (getValuesQuery === null) {
    getValuesQuery = database.prepare(`
      select round, row, value from clues
      where episodeId = $episodeId and round < ${FINAL_JEOPARDY_ROUND}
      group by round, row
    `)
  }
  if (getFinalJeopardyQuery === null) {
    getFinalJeopardyQuery = database.prepare(`
      select 1 from clues
      where episodeId = $episodeId and round = ${FINAL_JEOPARDY_ROUND}
    `)
  }
  const rows = getValuesQuery.all({ $episodeId: episodeId }) as {
    round: Round
    row: number
    value: number
  }[]

  if (rows.length === 0) {
    return {
      hasFinalJeopardy: true,
      rounds: [1, 2].map((round) => ({
        round,
        values: DEFAULT_ROUND_VALUES[round as Round],
      })) as GameRound[],
    }
  }

  const rounds: GameRound[] = []
  for (const { round, row, value } of rows) {
    let gameRound = rounds.find((r) => r.round === round)
    if (!gameRound) {
      // Rows with no clue fall back to the round's base value times row
      const base = value / row
      gameRound = {
        round,
        values: [1, 2, 3, 4, 5].map((r) => base * r),
      }
      rounds.push(gameRound)
    }
    gameRound.values[row - 1] = value
  }
  rounds.sort((a, b) => a.round - b.round)

  return {
    hasFinalJeopardy: Boolean(
      getFinalJeopardyQuery.get({ $episodeId: episodeId }),
    ),
    rounds,
  }
}
