import { io } from 'socket.io-client'
import { onSocketSessionEvents } from './onSocketSessionEvents'
import { onSocketUserEvents } from './onSocketUserEvents'

export const socket = io({ autoConnect: false })

onSocketSessionEvents(socket)
onSocketUserEvents(socket)
