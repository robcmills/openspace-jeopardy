import { CSSProperties, useEffect, useState } from 'react'
import { absoluteFill, gridCenter } from './styles'
import { socket } from './socket'
import { useParams } from 'react-router-dom'
import { ServerToClientEvents } from '../../server/socket-types'
import { useActiveClue } from './useActiveClue'
import { getActiveCategory } from './getActiveCategory'

const mainStyle: CSSProperties = {
  ...absoluteFill,
  ...gridCenter,
  gap: '1rem',
  padding: '1rem',
  textAlign: 'center',
}

export function HostView() {
  const { gameId } = useParams()
  const activeClue = useActiveClue()
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

  const category = getActiveCategory()
  const clue = activeClue?.answer

  const content = correctResponse ? (
    <>
      <h3>Category:</h3>
      <p>{category}</p>
      <h3>Clue:</h3>
      <p>{clue}</p>
      <h3>Correct response:</h3>
      <p>{correctResponse}</p>
    </>
  ) : (
    <h3>Awaiting clue...</h3>
  )

  return <main style={mainStyle}>{content}</main>
}
