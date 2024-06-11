import { LoaderFunction, redirect } from 'react-router-dom'
import { GetGameResponse } from '../../server/GetGameResponse'
import { jotaiStore } from './jotaiStore'
import { gameAtom } from './gameAtom'
import { contestantsAtom } from './contestantsAtom'
import { Contestant } from '../../server/Contestant'
import { usersAtom } from './usersAtom'
import { UserState } from './UserState'
import { Spectator } from '../../server/Spectator'
import { spectatorsAtom } from './spectatorsAtom'
import { getGamePath } from './getGamePath'
import { ClientGame } from './ClientGame'
import { tilesAtoms } from './tilesAtoms'

export const gameLoader: LoaderFunction = async ({ params }) => {
  console.log('gameLoader', params)

  const response = await fetch(`/api/games/${params.gameId}`)
  if (response.status === 404) {
    throw new Response('Not Found', { status: 404 })
  }
  const json = await response.json() as GetGameResponse

  if (json.game.state !== params.gameState) {
    // When host transitions game state, we update the game.state on server
    // If a contestant joins later, via a stale link, we need to redirect
    // them to the correct state
    return redirect(getGamePath(json.game.id, json.game.state))
  }

  const clientGame: ClientGame = {
    id: json.game.id,
    name: json.game.name,
    hostUserId: json.game.hostUserId,
  }
  jotaiStore.set(gameAtom, clientGame)

  for (let column = 0; column < 6; column++) {
    for (let row = 0; row < 5; row++) {
      jotaiStore.set(tilesAtoms[column][row], json.game.tiles[column][row])
    }
  }

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
