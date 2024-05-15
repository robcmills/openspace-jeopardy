import { useAtomValue } from 'jotai';
// import { GameState } from './GameState';
import { socketAtom } from './socketAtom';
import { socket } from './socket';
import { ConnectionStatusCharacter } from './ConnectionStatusCharacter';

// interface LoginProps {
//   setState: (state: GameState) => void;
// }

export function Lobby() {
  const { isConnected } = useAtomValue(socketAtom)
  return (
    <div>
      <h3>Lobby</h3>
      <p><ConnectionStatusCharacter /> You are {isConnected ? 'connected to' : 'disconnected from'} the server.</p>
      <button onClick={() => { socket.connect() }}>Connect</button>
      <button onClick={() => { socket.disconnect() }}>Disconnect</button>
    </div>
  )
}
