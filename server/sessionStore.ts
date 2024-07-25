import type { Session } from './Session'

export const sessionStore = {
  sessionMap: new Map<string, Session>(),
  indexByUserId: new Map<string, string>(),

  get(id: string) {
    return this.sessionMap.get(id)
  },

  getByUserId(userId: string) {
    const id = this.indexByUserId.get(userId)
    return id ? this.sessionMap.get(id) : null
  },

  set(id: string, session: Session) {
    this.sessionMap.set(id, session)
    this.indexByUserId.set(session.userId, id)
  },

  getAll() {
    return [...this.sessionMap.values()]
  },
}
