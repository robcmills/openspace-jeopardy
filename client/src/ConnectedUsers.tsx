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

  const containerStyle = {
    border: '1px solid gray',
  }

  const headerStyle = {
    backgroundColor: 'darkgreen',
    borderBottom: '1px solid gray',
    lineHeight: 1,
    margin: 0,
    padding: '0.5rem',
  }

  const usersStyle = {
    display: 'grid',
    gap: '0.75rem',
    padding: '0.75rem',
  }

  return (
    <div style={containerStyle}>
      <h3 style={headerStyle}>Connected Users</h3>
      <div style={usersStyle}>
        {users}
      </div>
    </div>
  )
}
