import { useAtomValue } from 'jotai';
import { socketAtom } from './socketAtom';

export function ConnectionStatusCharacter() {
  const { isConnected } = useAtomValue(socketAtom)
  return isConnected
    ? <span style={{ color: 'green', fontWeight: 'bold' }}>✓</span>
    : <span style={{ color: 'red', fontWeight: 'bold' }}>✗</span>
}
