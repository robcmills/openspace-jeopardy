import { socket } from './socket';
import { ConnectionStatus } from './ConnectionStatus';
import { UsernameForm } from './UsernameForm';
import { useAtomValue } from 'jotai';
import { socketAtom } from './socketAtom';
import { ConnectedUsers } from './ConnectedUsers';

export function Lobby() {
  const { isConnected, username } = useAtomValue(socketAtom)
  if (!username) return <UsernameForm />
  return (
    <main>
      <h1>Lobby</h1>
      <p><ConnectionStatus /></p>
      <button onClick={() => { socket.connect() }}>Connect</button>
      &nbsp; &nbsp;
      <button onClick={() => { socket.disconnect() }}>Disconnect</button>
      {isConnected && <ConnectedUsers />}
    </main>
  )
}
