import { io } from 'socket.io-client'
import type { Socket as IoSocket } from 'socket.io-client'
import { onSocketSessionEvents } from './onSocketSessionEvents'
import { onSocketUserEvents } from './onSocketUserEvents'
import {
  ClientToServerEvents,
  ServerToClientEvents,
} from '../../server/socket-types'
import { onSocketGameEvents } from './onSocketGameEvents'

export type Socket = IoSocket<ServerToClientEvents, ClientToServerEvents>

export const socket: Socket = io({ autoConnect: false })

onSocketSessionEvents(socket)
onSocketUserEvents(socket)
onSocketGameEvents(socket)
