import { useAtomValue } from 'jotai'
import { usersAtom } from './usersAtom'

export function ConnectedUsers() {
  const { usersById } = useAtomValue(usersAtom)

  const users = Object.values(usersById)
    .filter(user => user.isConnected)
    .map(({ id, username }) => (
      <div key={id}>
        {username}
      </div>
    ))

  return (
    <div>
      <h3>Connected Users</h3>
      {users}
    </div>
  )
}
