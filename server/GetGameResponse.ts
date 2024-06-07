import type { UserState } from '../client/src/UserState'
import type { Contestant } from './Contestant'
import type { Game } from './Game'
import type { Spectator } from './Spectator'

export type GetGameResponse = {
  contestants: Contestant[]
  game: Game
  spectators: Spectator[]
  users: UserState[]
}
