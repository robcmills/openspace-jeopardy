import { useLoaderData } from 'react-router-dom'
import { GameRouteData } from './GameRouteData'

export function useGameRouteData() {
  return useLoaderData() as GameRouteData
}
