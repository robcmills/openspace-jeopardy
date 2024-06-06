import { UserRole } from './UserRole'
import { getGamePath } from './getGamePath'
import { navigate } from './navigate'

export type JoinGameAsRoleParams = {
  gameId: string
  role: UserRole
  userId: string
}

export async function joinGameAsRole({ gameId, role, userId }: JoinGameAsRoleParams) {
  await fetch(
    `/api/games/${gameId}/join?role=${role}&userId=${userId}`,
    { method: 'POST' }
  )
  navigate.to(getGamePath(gameId))
}
