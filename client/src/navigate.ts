import { NavigateFunction } from 'react-router-dom';

export type Navigate = {
  to: NavigateFunction
}

/** 
 * Vessel to expose react-router-dom navigate function externally
 * (socket event handlers)
 */
export const navigate: Navigate = {
  to: () => {},
}
