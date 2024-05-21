import { Game } from '../../server/Game';
import { GAME_STATE_PATHS } from './GameState';

export function getGamePath(game: Game) {
  return `/games/${game.id}/${GAME_STATE_PATHS[game.state]}`
}
