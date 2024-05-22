import { LoaderFunction } from 'react-router-dom';
import { socket } from './socket';

export const gameLoader: LoaderFunction = ({ params }) => {
  if (params.gameId) socket.emit('joinGame', params.gameId)
  return null
}
