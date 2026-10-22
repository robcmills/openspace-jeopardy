import type { ClientGame } from './ClientGame'
import { GameState } from './GameState'
import { getGameStateForRound } from './getRoundForGameState'

// The game states a game moves through, skipping rounds its episode
// doesn't have (e.g. Triple Jeopardy only exists in Celebrity games)
export function getGameStates(
  game: Pick<ClientGame, 'hasFinalJeopardy' | 'rounds'>,
): GameState[] {
  return [
    GameState.Lobby,
    GameState.Video,
    ...game.rounds.map(({ round }) => getGameStateForRound(round)),
    ...(game.hasFinalJeopardy ? [GameState.FinalJeopardy] : []),
  ]
}
