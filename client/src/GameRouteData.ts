import { Game } from '../../server/Game'
import { UserState } from './UserState'

export type GameRouteData = {
  contestants: UserState[]
  game: Game
  host: UserState
}
