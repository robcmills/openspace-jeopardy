import type { UserState } from '../client/src/UserState'

export interface ServerToClientEvents {
  basicEmit: (a: number, b: string, c: Buffer) => void;
  noArg: () => void;
  session: (data: SocketData) => void;
  userConnected: (data: UserState) => void;
  userDisconnected: (userId: string) => void;
  users: (data: UserState[]) => void;
  withAck: (d: string, callback: (e: number) => void) => void;
}

export interface ClientToServerEvents {
  hello: () => void;
}

export interface InterServerEvents {
  ping: () => void;
}

export interface SocketData {
  sessionId: string;
  userId: string;
  username: string;
}
