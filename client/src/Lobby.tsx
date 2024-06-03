import { socket } from './socket';
import { ConnectionStatus } from './ConnectionStatus';
import { useAtomValue } from 'jotai';
import { socketAtom } from './socketAtom';
import { ConnectedUsers } from './ConnectedUsers';
import { LiveGames } from './LiveGames';
import { centerFill } from './styles';

export function Lobby() {
  const { isSessionEstablished } = useAtomValue(socketAtom)

  const style = {
    ...centerFill,
    gap: '1rem',
    padding: '2rem',
    justifyItems: 'start',
  }

  return (
    <main style={style}>
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
        {isSessionEstablished && <LiveGames />}
        {isSessionEstablished && <ConnectedUsers />}
      </div>
    </main>
  )
}
