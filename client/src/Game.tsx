import { Outlet } from 'react-router-dom';
import { useKeyBindings } from './useKeyBindings';

export function Game() {
  useKeyBindings()
  return <Outlet />
}
