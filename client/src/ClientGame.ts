import { Game as ServerGame } from '../../server/Game'

/*
 * Client game state is stored in the url
 */
export type ClientGame = Omit<ServerGame, 'state'>
