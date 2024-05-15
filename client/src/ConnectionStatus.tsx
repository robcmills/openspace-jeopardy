import { useAtomValue } from 'jotai';
import { socketAtom } from './socketAtom';

export function ConnectionStatus() {
  const { isConnected } = useAtomValue(socketAtom)
  const character = isConnected
    ? <span style={{ color: 'green', fontWeight: 'bold' }}>✓</span>
    : <span style={{ color: 'red', fontWeight: 'bold' }}>✗</span>
  return (
    <>
      {character} You are {isConnected ? 'connected' : 'not connected'} to the server.
    </>
  )
}
