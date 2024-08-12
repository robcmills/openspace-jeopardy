import { useEffect, useState } from 'react'
import { absoluteFill, gridCenter } from './styles'
import { socket } from './socket'
import { useParams } from 'react-router-dom'
import { ServerToClientEvents } from '../../server/socket-types'

const mainStyle = {
  ...absoluteFill,
  ...gridCenter,
  gap: '1rem',
}

export function HostView() {
  const { gameId } = useParams()
  const [correctResponse, setCorrectResponse] = useState<string | null>(null)

  const setCorrectResponseHandler: ServerToClientEvents['setCorrectResponse'] =
    ({ correctResponse }) => {
      console.log(correctResponse)
      setCorrectResponse(correctResponse)
    }

  useEffect(() => {
    if (gameId) {
      socket.emit('joinGame', { gameId, userRole: 'host' })
    }
    socket.on('setCorrectResponse', setCorrectResponseHandler)
    return () => {
      socket.off('setCorrectResponse', setCorrectResponseHandler)
    }
  }, [])

  const content = correctResponse ? (
    <>
      <h3>Correct response:</h3>
      <p>{correctResponse}</p>
    </>
  ) : (
    <h3>Awaiting clue...</h3>
  )

  return <main style={mainStyle}>{content}</main>
}
