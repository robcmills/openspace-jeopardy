import { useAtomValue } from 'jotai';
// import { GameState } from './GameState';
import { socketAtom } from './socketAtom';
import { socket } from './socket';

// interface LoginProps {
//   setState: (state: GameState) => void;
// }

export function Login() {
  const isConnected = useAtomValue(socketAtom)
  console.log('isConnected', isConnected)
  return (
    <div>
      <h3>Login</h3>
      <p>{isConnected ? 'Connected' : 'Disconnected'}</p>
      <button onClick={() => { socket.connect() }}>Login</button>
      <button onClick={() => { socket.disconnect() }}>Logout</button>
    </div>
  )
}
