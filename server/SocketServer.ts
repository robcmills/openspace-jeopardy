import type { Server } from 'socket.io'
import type {
  ServerToClientEvents,
  ClientToServerEvents,
  InterServerEvents,
  SocketData,
} from './socket-types'

export type SocketServer = Server<
  ServerToClientEvents,
  ClientToServerEvents,
  InterServerEvents,
  SocketData
>
