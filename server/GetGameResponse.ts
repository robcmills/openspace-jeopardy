import type { UserState } from '../client/src/UserState'
import type { Contestant } from './Contestant'
import type { ServerGame } from './ServerGame'
import type { Spectator } from './Spectator'

export type GetGameResponse = {
  contestants: Contestant[]
  game: ServerGame
  spectators: Spectator[]
  users: UserState[]
}
