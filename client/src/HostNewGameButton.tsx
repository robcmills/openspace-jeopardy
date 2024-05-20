import { useState } from 'react'
import { socket } from './socket'

export function HostNewGameButton() {
  const [disabled, setDisabled] = useState(false)

  const hostNewGame = () => {
    setDisabled(true)
    socket.emit('hostNewGame')
  }

  return (
    <button disabled={disabled} onClick={hostNewGame}>Host new</button>
  )
}
