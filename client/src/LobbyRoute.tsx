import { useEffect } from 'react'
import { Lobby } from './Lobby'
import { socket } from './socket'

export function LobbyRoute() {
  useEffect(() => {
    socket.emit('joinLobby')
    return () => {
      socket.emit('leaveLobby')
    }
  }, [])
  return <Lobby />
}
