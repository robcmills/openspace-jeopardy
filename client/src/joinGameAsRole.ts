import { UserRole } from './UserRole'
import { getGamePath } from './getGamePath'
import { navigate } from './navigate'

export type JoinGameAsRoleParams = {
  gameId: string
  role: UserRole
  sessionId: string
  userId: string
}

export async function joinGameAsRole({
  gameId,
  role,
  sessionId,
  userId,
}: JoinGameAsRoleParams) {
  try {
    await fetch(
      `/api/games/${gameId}/join?role=${role}&sessionId=${sessionId}&userId=${userId}`,
      {
        method: 'POST',
      },
    )
    navigate.to(getGamePath(gameId))
  } catch (error) {
    alert('Failed to join game')
    console.error(error)
  }
}
