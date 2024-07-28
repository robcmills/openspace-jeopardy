import { atom } from 'jotai'
import { ServerGame } from '../../server/ServerGame'

export const gamesAtom = atom<ServerGame[]>([])
