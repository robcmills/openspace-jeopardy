import type { UserState } from '../client/src/UserState'
import type { Contestant } from './Contestant';
import type { Game } from './Game';

export interface ServerToClientEvents {
  basicEmit: (a: number, b: string, c: Buffer) => void;
  contestantJoined: (data: { contestant: Contestant, user: UserState }) => void;
  game: (game: Game) => void;
  gameCreated: (game: Game) => void;
  gameJoined: (game: Game) => void;
  games: (games: Game[]) => void;
  noArg: () => void;
  session: (data: SocketData) => void;
  userConnected: (data: UserState) => void;
  userDisconnected: (userId: string) => void;
  users: (data: UserState[]) => void;
  withAck: (d: string, callback: (e: number) => void) => void;
}

export interface ClientToServerEvents {
  getGame: (gameId: string) => void;
  hello: () => void;
  hostNewGame: (gameName: string) => void;
  joinGame: (gameId: string) => void;
  joinLobby: () => void;
  leaveLobby: () => void;
}

export interface InterServerEvents {
  ping: () => void;
}

export interface SocketData {
  sessionId: string;
  userId: string;
  username: string;
}
