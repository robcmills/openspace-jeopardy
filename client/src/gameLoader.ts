import { LoaderFunction } from 'react-router-dom'

export const gameLoader: LoaderFunction = async ({ params }) => {
  console.log('gameLoader', params)
  const response = await fetch(`/api/games/${params.gameId}`)
  if (response.status === 404) {
    throw new Response('Not Found', { status: 404 })
  }
  return response.json()
}
