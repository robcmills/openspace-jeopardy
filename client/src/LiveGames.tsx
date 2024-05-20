import { HostNewGameButton } from './HostNewGameButton'

export function LiveGames() {
  const joinStyle = {
    margin: '0 1rem',
  }

  const games = [{ id: 1, name: 'OpenSpace Frontend Jeopardy' }]
    .map(({ id, name }) => (
      <div key={id}>
        {name}
        <button style={joinStyle}>Join</button>
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
        {games}
      </div>
    </div>
  )
}
