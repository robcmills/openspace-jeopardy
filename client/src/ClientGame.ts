import { ServerGame } from '../../server/ServerGame'

/*
 * Client game state is stored in the url.
 * Tiles state are stored in separate atoms.
 */
export type ClientGame = Pick<ServerGame, 'hostUserId' | 'id' | 'name'>
