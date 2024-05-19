import type { Socket } from 'socket.io-client';
import type {
  ServerToClientEvents,
  ClientToServerEvents,
} from '../../server/socket-types'

export type SocketClient = Socket<ServerToClientEvents, ClientToServerEvents>
