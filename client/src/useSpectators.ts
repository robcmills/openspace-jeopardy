import { useAtomValue } from 'jotai'
import { usersAtom } from './usersAtom'
import { spectatorsAtom } from './spectatorsAtom'

export function useSpectators(gameId: string) {
  const { spectatorsById } = useAtomValue(spectatorsAtom)
  const { usersById } = useAtomValue(usersAtom)
  return Object.values(spectatorsById)
    .filter((spectator) => spectator.gameId === gameId)
    .map((spectator) => usersById[spectator.userId])
}
