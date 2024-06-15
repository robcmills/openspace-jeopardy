import { CSSProperties } from 'react'
import { useIsAnyClueVisible } from './useIsAnyClueVisible'
import { useAtomValue } from 'jotai'
import { activeContestantAtom } from './activeContestantAtom'

const controlsStyle: CSSProperties = {
  borderTop: '1px solid white',
  display: 'grid',
  gap: 16,
  gridAutoFlow: 'column',
  justifyContent: 'center',
  padding: 16,
  placeItems: 'center',
}

const buttonStyle: CSSProperties = {
  border: '1px solid',
  borderRadius: 16,
  cursor: 'pointer',
  fontWeight: 'bold',
  height: 32,
  width: 64,
}

export function HostControls() {
  const activeContestant = useAtomValue(activeContestantAtom)
  const isAnyClueVisible = useIsAnyClueVisible()
  if (!isAnyClueVisible || !activeContestant) return null

  return (
    <div style={controlsStyle}>
      <button className='correct' style={buttonStyle}>✓</button>
      <button className='incorrect' style={buttonStyle}>✗</button>
    </div>
  )
}
