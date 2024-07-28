import { useAtomValue } from 'jotai'
import { socketAtom } from './socketAtom'

export function ConnectionStatus() {
  const { isConnected, username } = useAtomValue(socketAtom)
  const character = isConnected ? (
    <span style={{ color: 'green', fontWeight: 'bold' }}>✓</span>
  ) : (
    <span style={{ color: 'red', fontWeight: 'bold' }}>✗</span>
  )
  return (
    <>
      {character}
      {isConnected ? ' Connected ' : ' Not connected '}
      to server
      {isConnected ? ` as ${username}` : ''}
    </>
  )
}
