import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import { Lobby } from './Lobby';
import { ErrorPage } from './ErrorPage';
import { Root } from './Root';
import { gameLoader } from './gameLoader';
import { Game } from './Game';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path='/'
      element={<Root />}
      errorElement={<ErrorPage />}
    >
      <Route path='lobby' element={<Lobby />} />
      <Route
      	path='games/:gameId/:gameState'
      	element={<Game />}
      	loader={gameLoader}
      />
    </Route>
  )
)
