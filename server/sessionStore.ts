import type { Session } from './Session';

export const sessionStore = {
  sessionMap: new Map<string, Session>(),

  get(id: string) {
    return this.sessionMap.get(id)
  },

  set(id: string, session: Session) {
    this.sessionMap.set(id, session);
  },

  getAll() {
    return [...this.sessionMap.values()];
  }
}
