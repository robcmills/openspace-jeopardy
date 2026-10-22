import type { Round } from '../client/src/Round'

export type GameRound = {
  round: Round
  // Board value of each row, top to bottom
  values: number[]
}
