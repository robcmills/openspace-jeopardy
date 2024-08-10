import type { Session } from './Session'

export const sessionStore = {
  sessionMap: new Map<string, Session>(),
  indexByUserId: new Map<string, string>(),
  indexByUsername: new Map<string, string>(),

  get(id: string) {
    return this.sessionMap.get(id)
  },

  getByUserId(userId: string) {
    const id = this.indexByUserId.get(userId)
    return id ? this.sessionMap.get(id) : null
  },

  getByUsername(username: string) {
    const id = this.indexByUsername.get(username)
    const session = id ? this.sessionMap.get(id) : null
    return session || null
  },

  set(session: Session) {
    this.sessionMap.set(session.sessionId, session)
    this.indexByUserId.set(session.userId, session.sessionId)
    this.indexByUsername.set(session.username, session.sessionId)
  },

  getAll() {
    return [...this.sessionMap.values()]
  },
}
