import type { FinalJeopardyState } from '../client/src/FinalJeopardyState'
import type { TileState } from '../client/src/TileState'
import type { UserState } from '../client/src/UserState'
import type { UserRole } from '../client/src/UserRole'
import type { GameState } from '../client/src/GameState'
import type { Contestant } from './Contestant'
import type { ServerGame } from './ServerGame'
import type { Spectator } from './Spectator'
import type { CategoryTileState } from '../client/src/CategoryTileState'

export interface ServerToClientEvents {
  activateRandomContestant: (data: { contestantId: string }) => void
  basicEmit: (a: number, b: string, c: Buffer) => void
  clearTimer: () => void
  contestantJoined:
    (data: { contestant: Contestant, user: UserState }) => void
  game: (game: ServerGame) => void
  gameCreated: (game: ServerGame) => void
  gameJoined: (game: ServerGame) => void
  games: (games: ServerGame[]) => void
  noArg: () => void
  panCategories: () => void
  restartTimer: () => void
  revealTiles: () => void
  session: (data: SocketData) => void
  setActiveContestant: (data: { contestantId: string | null }) => void
  setCategoryState: (data: {
    column: number
    state: CategoryTileState
  }) => void
  setContestantQuestion: (data: {
    contestantId: string
    question: string
  }) => void
  setContestantScore: (data: {
    contestantId: string
    score: number
  }) => void
  setContestantWager: (data: {
    contestantId: string
    wager: number
  }) => void
  setFinalJeopardyState: (data: { state: FinalJeopardyState }) => void
  setGameState: (data: { gameId: string, gameState: GameState }) => void
  setTileState: (data: {
    column: number
    row: number
    state: TileState
  }) => void
  spectatorJoined: (data: { spectator: Spectator, user: UserState }) => void
  toggleTimer: () => void
  userConnected: (data: UserState) => void
  userDisconnected: (userId: string) => void
  users: (data: UserState[]) => void
  withAck: (d: string, callback: (e: number) => void) => void
  zoomCategories: (data: { direction: 'in' | 'out' }) => void
}

export interface ClientToServerEvents {
  activateRandomContestant: (data: {
    contestantId: string
    gameId: string
  }) => void
  clearTimer: (data: { gameId: string }) => void
  contestantBuzzer: (data: { contestantId: string, gameId: string }) => void
  cycleTileState: (data: {
    column: number
    gameId: string
    row: number
  }) => void
  getGame: (gameId: string) => void
  hello: () => void
  hostNewGame: (gameName: string) => void
  joinGame: (data: { gameId: string, userRole: UserRole }) => void
  joinLobby: () => void
  leaveLobby: () => void
  panCategories: (data: { gameId: string }) => void
  resetTiles: (data: { gameId: string }) => void
  restartTimer: (data: { gameId: string }) => void
  revealTiles: (data: { gameId: string }) => void
  setActiveContestant: (data: {
    contestantId: string | null
    gameId: string
  }) => void
  setCategoryState: (data: {
    column: number
    gameId: string
    state: CategoryTileState
  }) => void
  setContestantScore: (data: {
    contestantId: string
    gameId: string
    score: number
  }) => void
  setContestantQuestion: (data: {
    contestantId: string
    gameId: string
    question: string
  }) => void
  setContestantWager: (data: {
    contestantId: string
    gameId: string
    wager: number
  }) => void
  setFinalJeopardyState: (data: {
    gameId: string
    state: FinalJeopardyState
  }) => void
  setGameState: (data: {
    gameId: string
    gameState: GameState
  }, callback: () => void) => void
  setTileState: (data: {
    column: number
    gameId: string
    row: number
    state: Partial<TileState>
  }) => void
  toggleTimer: (data: { gameId: string }) => void
  zoomCategories:
    (data: { direction: 'in' | 'out', gameId: string }) => void
}

export interface InterServerEvents {
  ping: () => void
}

export interface SocketData {
  sessionId: string
  socketId: string
  userId: string
  username: string
}
