import { useEffect, useState } from 'react'
import { GameState } from './GameState'
import { absoluteFill, gridCenter } from './styles'
import { socket } from './socket'
import { useParams } from 'react-router-dom'

const mainStyle = {
  ...absoluteFill,
  ...gridCenter,
}

export function HostView() {
  const { gameId } = useParams()
  const [gameState, setGameState] = useState<GameState>(GameState.Lobby)

  useEffect(() => {
    if (gameId) {
      socket.emit('joinGame', { gameId, userRole: 'host' })
    }
    const setGameStateHandler = ({ gameState }: { gameState: GameState }) => {
      setGameState(gameState)
    }
    socket.on('setGameState', setGameStateHandler)
    return () => {
      socket.off('setGameState', setGameStateHandler)
    }
  }, [])

  if (
    ![
      GameState.Jeopardy,
      GameState.DoubleJeopardy,
      GameState.FinalJeopardy,
    ].includes(gameState)
  ) {
    return (
      <main style={mainStyle}>
        <h3>Awaiting clue...</h3>
      </main>
    )
  }

  return (
    <main style={mainStyle}>
      <h3>Correct response:</h3>
    </main>
  )
}
