import { Game } from '../../server/Game'
import { UserState } from './UserState'

export type GameRouteData = {
  game: Game
  host: UserState
}
