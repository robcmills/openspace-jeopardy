import { useState } from 'react'
import { socket } from './socket'

export function HostNewGameButton() {
  const [name, setName] = useState('')
  const [episodeId, setEpisodeId] = useState('')
  const [clicked, setClicked] = useState(false)
  const [disabled, setDisabled] = useState(false)

  const hostNewGame = () => {
    setDisabled(true)
    socket.emit('hostNewGame', { episodeId, name })
  }

  return clicked ? (
    <>
      <input
        type="text"
        placeholder="Game name"
        disabled={disabled}
        onChange={(e) => setName(e.target.value)}
        value={name}
      />
      &nbsp;
      <input
        type="text"
        placeholder="Episode id (optional)"
        disabled={disabled}
        onChange={(e) => setEpisodeId(e.target.value)}
        value={episodeId}
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
