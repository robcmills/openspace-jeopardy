export interface Session {
  isConnected: boolean
  sessionId: string
  socketIds: string[]
  userId: string
  username: string
}
