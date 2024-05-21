import { useAtomValue } from 'jotai'
import { useNavigate } from 'react-router-dom'
import { gameAtom } from './gameAtom'
import { useEffect } from 'react'
import { getGamePath } from './getGamePath'

export function useGameStateNavigation() {
  const navigate = useNavigate()
  const game = useAtomValue(gameAtom)
  useEffect(() => {
    console.log('useGameStateNavigation', { game })
    if (!game.id) return
    navigate(getGamePath(game))
  }, [game.id, game.state])
}
