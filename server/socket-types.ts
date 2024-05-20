import type { UserState } from '../client/src/UserState'
import type { Game } from './Game';

export interface ServerToClientEvents {
  basicEmit: (a: number, b: string, c: Buffer) => void;
  gameCreated: (game: Game) => void;
  games: (games: Game[]) => void;
  noArg: () => void;
  session: (data: SocketData) => void;
  userConnected: (data: UserState) => void;
  userDisconnected: (userId: string) => void;
  users: (data: UserState[]) => void;
  withAck: (d: string, callback: (e: number) => void) => void;
}

export interface ClientToServerEvents {
  hello: () => void;
  hostNewGame: (gameName: string) => void;
}

export interface InterServerEvents {
  ping: () => void;
}

export interface SocketData {
  sessionId: string;
  userId: string;
  username: string;
}
