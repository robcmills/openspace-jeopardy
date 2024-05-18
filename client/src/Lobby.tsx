import { socket } from './socket';
import { ConnectionStatus } from './ConnectionStatus';
import { UsernameForm } from './UsernameForm';
import { useAtomValue } from 'jotai';
import { socketAtom } from './socketAtom';
import { ConnectedUsers } from './ConnectedUsers';
import { LiveGames } from './LiveGames';

export function Lobby() {
  const { isConnected, username } = useAtomValue(socketAtom)
  if (!username) return <UsernameForm />
  return (
    <main style={{ display: 'grid', gap: '1rem', padding: '2rem' }}>
      <h1>Lobby</h1>
      <p><ConnectionStatus /></p>
      <div style={{
        display: 'grid',
        gap: '1rem',
        gridAutoFlow: 'column',
        justifyContent: 'start'
      }}>
        <button onClick={() => { socket.connect() }}>Connect</button>
        <button onClick={() => { socket.disconnect() }}>Disconnect</button>
      </div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
        {isConnected && <ConnectedUsers />}
        {isConnected && <LiveGames />}
      </div>
    </main>
  )
}
