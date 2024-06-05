import { getGamePath } from './getGamePath'
import { navigate } from './navigate'

export async function joinGameAsContestant(gameId: string, userId: string) {
  await fetch(
    `/api/games/${gameId}/join?role=contestant&userId=${userId}`,
    { method: 'POST' }
  )
  navigate.to(getGamePath(gameId))
}
