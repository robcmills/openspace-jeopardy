import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import { ErrorPage } from './ErrorPage'
import { RootRoute } from './RootRoute'
import { GameRoute } from './GameRoute'
import { gameLoader } from './gameLoader'
import { GameRouteError } from './GameRouteError'
import { LobbyRoute } from './LobbyRoute'

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path='/'
      element={<RootRoute />}
      errorElement={<ErrorPage />}
    >
      <Route path='lobby' element={<LobbyRoute />} />
      <Route
        path='games/:gameId/:gameState'
        element={<GameRoute />}
        errorElement={<GameRouteError />}
        loader={gameLoader}
      />
    </Route>
  )
)
