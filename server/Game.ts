import { GameState } from '../client/src/GameState'

export type Game = {
  id: string,
  hostUserId: string,
  state: GameState,
}
