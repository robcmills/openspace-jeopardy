import type { Session } from './Session'

export const sessionStore = {
  sessionMap: new Map<string, Session>(),
  indexByUserId: new Map<string, string>(),
  indexByUsername: new Map<string, string>(),

  get(sessionId: string) {
    return this.sessionMap.get(sessionId)
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
    const existingSession = this.sessionMap.get(session.sessionId)
    this.sessionMap.set(session.sessionId, {
      ...session,
      socketIds: [...(existingSession?.socketIds || []), ...session.socketIds],
    })
    this.indexByUserId.set(session.userId, session.sessionId)
    this.indexByUsername.set(session.username, session.sessionId)
    return existingSession || session
  },

  getAll() {
    return [...this.sessionMap.values()]
  },
}
