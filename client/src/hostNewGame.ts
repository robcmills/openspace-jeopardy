import { socket } from './socket'

export function hostNewGame() {
  socket.emit('hostNewGame')
}
