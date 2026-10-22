import type { ClientGame } from './ClientGame'
import { DEFAULT_ROUND_VALUES, type Round } from './Round'

export function getTileValue(
  game: Pick<ClientGame, 'rounds'>,
  round: Round,
  rowIndex: number,
) {
  const values =
    game.rounds.find((gameRound) => gameRound.round === round)?.values ??
    DEFAULT_ROUND_VALUES[round]
  return values[rowIndex]
}
