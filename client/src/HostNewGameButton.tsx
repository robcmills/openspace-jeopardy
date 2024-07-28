import { useState } from 'react'
import { socket } from './socket'

export function HostNewGameButton() {
  const [gameName, setGameName] = useState('')
  const [clicked, setClicked] = useState(false)
  const [disabled, setDisabled] = useState(false)

  const hostNewGame = () => {
    setDisabled(true)
    socket.emit('hostNewGame', gameName)
  }

  return clicked ? (
    <>
      <input
        type="text"
        placeholder="Game name"
        disabled={disabled}
        onChange={(e) => setGameName(e.target.value)}
        value={gameName}
      />
      &nbsp;
      <button disabled={disabled} onClick={hostNewGame}>
        Submit
      </button>
    </>
  ) : (
    <button disabled={disabled} onClick={() => setClicked(true)}>
      Host new
    </button>
  )
}
