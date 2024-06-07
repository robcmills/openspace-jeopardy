import { LoaderFunction } from 'react-router-dom'
import { GetGameResponse } from '../../server/GetGameResponse'
import { jotaiStore } from './jotaiStore'
import { gameAtom } from './gameAtom'
import { contestantsAtom } from './contestantsAtom'
import { Contestant } from '../../server/Contestant'
import { usersAtom } from './usersAtom'
import { UserState } from './UserState'
import { Spectator } from '../../server/Spectator'
import { spectatorsAtom } from './spectatorsAtom'

export const gameLoader: LoaderFunction = async ({ params }) => {
  console.log('gameLoader', params)
  const response = await fetch(`/api/games/${params.gameId}`)
  if (response.status === 404) {
    throw new Response('Not Found', { status: 404 })
  }
  const json = await response.json() as GetGameResponse

  jotaiStore.set(gameAtom, json.game)

  jotaiStore.set(contestantsAtom, {
    contestantsById: json.contestants.reduce((acc, contestant) => {
      acc[contestant.id] = contestant
      return acc
    }, {} as Record<string, Contestant>),
  })

  jotaiStore.set(spectatorsAtom, {
    spectatorsById: json.spectators.reduce((acc, spectator) => {
      acc[spectator.id] = spectator
      return acc
    }, {} as Record<string, Spectator>),
  })

  jotaiStore.set(usersAtom, {
    usersById: json.users.reduce((acc, user) => {
      acc[user.id] = user
      return acc
    }, {} as Record<string, UserState>),
  })

  return json
}
