import { useRouteError } from 'react-router-dom'

export function GameRouteError() {
  const error = useRouteError() as Error & { status: number }
  console.error(error)
  if (error.status === 404) return <p>Game not found.</p>
  return <p>An error occurred.</p>
}
