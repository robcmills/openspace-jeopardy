export type Round = 1 | 2 | 3

export const ROUNDS: Round[] = [1, 2, 3]

// Final Jeopardy is stored as its own round in the database, after the
// (up to three) board rounds.
export const FINAL_JEOPARDY_ROUND = 4

// Board values per row when an episode has no clue values to go by.
export const DEFAULT_ROUND_VALUES: Record<Round, number[]> = {
  1: [200, 400, 600, 800, 1000],
  2: [400, 800, 1200, 1600, 2000],
  3: [600, 1200, 1800, 2400, 3000],
}
