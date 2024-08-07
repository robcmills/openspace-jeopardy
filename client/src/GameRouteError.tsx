import { Link, useRouteError } from 'react-router-dom'

export function GameRouteError() {
  const error = useRouteError() as Error & { status: number }
  if (error.status === 404) {
    return (
      <>
        <p>Game not found.</p>
        <Link to="/lobby">Go back to the lobby</Link>
      </>
    )
  }
  console.error(error)
  return <p>An error occurred.</p>
}
