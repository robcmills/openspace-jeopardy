import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import { Lobby } from './Lobby';
import { ErrorPage } from './ErrorPage';
import { RootRoute } from './RootRoute';
import { GameRoute } from './GameRoute';
import { gameLoader } from './gameLoader';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path='/'
      element={<RootRoute />}
      errorElement={<ErrorPage />}
    >
      <Route path='lobby' element={<Lobby />} />
      <Route
        path='games/:gameId/:gameState'
        element={<GameRoute />}
        loader={gameLoader}
      />
    </Route>
  )
)
