import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import { Lobby } from './Lobby';
import { ErrorPage } from './ErrorPage';
import { App } from './App';
import { Game } from './Game';
import { gameLoader } from './gameLoader';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path='/'
      element={<App />}
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
