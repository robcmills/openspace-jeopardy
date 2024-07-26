import { atom } from 'jotai'
import { UserState } from './UserState'

export type UsersState = {
  usersById: Record<string, UserState>
}

export const usersAtom = atom<UsersState>({
  usersById: {},
})
