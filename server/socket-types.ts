import type { UserState } from '../client/src/UserState'
import type { UserRole } from '../client/src/UserRole'
import type { GameState } from '../client/src/GameState'
import type { Contestant } from './Contestant'
import type { Game } from './Game'
import type { Spectator } from './Spectator'

export interface ServerToClientEvents {
  basicEmit: (a: number, b: string, c: Buffer) => void
  contestantJoined: (data: { contestant: Contestant, user: UserState }) => void
  game: (game: Game) => void
  gameCreated: (game: Game) => void
  gameJoined: (game: Game) => void
  games: (games: Game[]) => void
  noArg: () => void
  session: (data: SocketData) => void
  setGameState: (data: { gameId: string, gameState: GameState }) => void
  spectatorJoined: (data: { spectator: Spectator, user: UserState }) => void
  userConnected: (data: UserState) => void
  userDisconnected: (userId: string) => void
  users: (data: UserState[]) => void
  withAck: (d: string, callback: (e: number) => void) => void
}

export interface ClientToServerEvents {
  getGame: (gameId: string) => void
  hello: () => void
  hostNewGame: (gameName: string) => void
  joinGame: (data: { gameId: string, userRole: UserRole }) => void
  joinLobby: () => void
  leaveLobby: () => void
  setGameState: (data: { gameId: string, gameState: GameState }) => void
}

export interface InterServerEvents {
  ping: () => void
}

export interface SocketData {
  sessionId: string
  userId: string
  username: string
}
