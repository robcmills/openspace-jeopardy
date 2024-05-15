import { socket } from './socket';
import { ConnectionStatus } from './ConnectionStatus';
import { UsernameForm } from './UsernameForm';
import { useAtomValue } from 'jotai';
import { socketAtom } from './socketAtom';

export function Lobby() {
  const { username } = useAtomValue(socketAtom)
  if (!username) return <UsernameForm />
  return (
    <main>
      <h3>Lobby</h3>
      <p><ConnectionStatus /></p>
      <button onClick={() => { socket.connect() }}>Connect</button>
      &nbsp; &nbsp;
      <button onClick={() => { socket.disconnect() }}>Disconnect</button>
    </main>
  )
}
