import { useUserRole } from './useUserRole'

export function useIsContestant() {
  const role = useUserRole()
  return role === 'contestant'
}
