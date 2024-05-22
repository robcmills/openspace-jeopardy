import { useAtomValue } from 'jotai'
import { HostNewGameButton } from './HostNewGameButton'
import { gamesAtom } from './gamesAtom'
import { Link } from 'react-router-dom'
import { getGamePath } from './getGamePath'

export function LiveGames() {
  const games = useAtomValue(gamesAtom)
  const joinStyle = {
    margin: '0 1rem',
  }

  const gamesItems = games
    .map((game) => (
      <div key={game.id}>
        {game.name}
        <Link to={getGamePath(game.id)}>
          <button style={joinStyle}>Join</button>
        </Link>
      </div>
    ))
    .concat([(
      <div key='new'>
        <HostNewGameButton />
      </div>
    )])

  const containerStyle = {
    border: '1px solid gray',
  }

  const headerStyle = {
    backgroundColor: 'darkblue',
    borderBottom: '1px solid gray',
    lineHeight: 1,
    margin: 0,
    padding: '0.5rem',
  }

  const gamesStyle = {
    display: 'grid',
    gap: '0.75rem',
    padding: '0.75rem',
  }

  return (
    <div style={containerStyle}>
      <h3 style={headerStyle}>Live Games</h3>
      <div style={gamesStyle}>
        {gamesItems}
      </div>
    </div>
  )
}
