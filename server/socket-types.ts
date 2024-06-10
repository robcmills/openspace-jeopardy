import type { TileState } from '../client/src/TileState'
import type { UserState } from '../client/src/UserState'
import type { UserRole } from '../client/src/UserRole'
import type { GameState } from '../client/src/GameState'
import type { Contestant } from './Contestant'
import type { Game } from './Game'
import type { Spectator } from './Spectator'

export interface ServerToClientEvents {
  basicEmit: (a: number, b: string, c: Buffer) => void
  contestantJoined:
    (data: { contestant: Contestant, user: UserState }) => void
  game: (game: Game) => void
  gameCreated: (game: Game) => void
  gameJoined: (game: Game) => void
  games: (games: Game[]) => void
  noArg: () => void
  panCategories: () => void
  revealCategory: (data: { column: number }) => void
  revealTiles: () => void
  session: (data: SocketData) => void
  setGameState: (data: { gameId: string, gameState: GameState }) => void
  setTileState: (data: {
    column: number,
    row: number,
    state: TileState,
  }) => void
  spectatorJoined: (data: { spectator: Spectator, user: UserState }) => void
  userConnected: (data: UserState) => void
  userDisconnected: (userId: string) => void
  users: (data: UserState[]) => void
  withAck: (d: string, callback: (e: number) => void) => void
  zoomCategories: (data: { direction: 'in' | 'out' }) => void
}

export interface ClientToServerEvents {
  getGame: (gameId: string) => void
  hello: () => void
  hostNewGame: (gameName: string) => void
  joinGame: (data: { gameId: string, userRole: UserRole }) => void
  joinLobby: () => void
  leaveLobby: () => void
  panCategories: (data: { gameId: string }) => void
  revealCategory: (data: { column: number, gameId: string }) => void
  revealTiles: (data: { gameId: string }) => void
  setGameState: (data: { gameId: string, gameState: GameState }) => void
  setTileState: (data: {
    column: number,
    gameId: string,
    row: number,
    state: TileState,
  }) => void
  zoomCategories:
    (data: { direction: 'in' | 'out', gameId: string }) => void
}

export interface InterServerEvents {
  ping: () => void
}

export interface SocketData {
  sessionId: string
  userId: string
  username: string
}
