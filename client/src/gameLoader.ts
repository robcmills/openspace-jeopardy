import { LoaderFunction } from 'react-router-dom';

export const gameLoader: LoaderFunction = ({ params }) => {
  console.log('gameLoader', params)
  // if (params.gameId) socket.emit('getGame', params.gameId)
  // return null
  return fetch(`/api/games/${params.gameId}`)
}
