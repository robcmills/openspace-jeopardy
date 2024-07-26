import { FinalJeopardy } from './FinalJeopardy'
import { Jeopardy } from './Jeopardy'
import { useGameState } from './useGameState'
import { useHostKeyBindings } from './useHostKeyBindings'
import { useEffect } from 'react'
import { socket } from './socket'
import { useAtomValue } from 'jotai'
import { gameAtom } from './gameAtom'
import { useUserRole } from './useUserRole'
import { Video } from './Video'
import { GameLobby } from './GameLobby'

export function Game() {
  useHostKeyBindings()
  const { gameState } = useGameState()
  const game = useAtomValue(gameAtom)
  const userRole = useUserRole()

  useEffect(() => {
    if (userRole === null) return
    socket.emit('joinGame', { gameId: game.id, userRole })
  }, [userRole])

  return {
    lobby: <GameLobby />,
    video: <Video />,
    jeopardy: <Jeopardy round={1} />,
    doubleJeopardy: <Jeopardy round={2} />,
    finalJeopardy: <FinalJeopardy />,
  }[gameState]
}
