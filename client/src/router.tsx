import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom';
import { Lobby } from './Lobby';
import { ErrorPage } from './ErrorPage';
import { App } from './App';
import { FinalJeopardy } from './FinalJeopardy';
import { Intro } from './Intro';
import { Jeopardy } from './Jeopardy';
import { Logo } from './Logo';
import { Game } from './Game';

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route
      path='/'
      element={<App />}
      errorElement={<ErrorPage />}
    >
      <Route path='lobby' element={<Lobby />} />
      <Route path='games/:gameId' element={<Game />}>
      	<Route path='intro' element={<Intro />} />
      	<Route path='logo' element={<Logo />} />
      	<Route path='jeopardy' element={<Jeopardy />} />
      	<Route path='doubleJeopardy' element={<Jeopardy round={2} />} />
      	<Route path='finalJeopardy' element={<FinalJeopardy />} />
      </Route>
    </Route>
  )
)
