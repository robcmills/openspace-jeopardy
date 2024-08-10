import type { Express } from 'express'
import { sessionStore } from './sessionStore'

export function useLoginEndpoints(app: Express) {
  app.post('/login', (req, res) => {
    console.log('login', req.query.username, req.query.sessionId)
    const username = req.query.username
    if (!username || typeof username !== 'string') {
      res.status(400).json({ error: 'Username is required' })
      return
    }
    const sessionId = req.query.sessionId
    const maybeSession = sessionStore.getByUsername(username)
    if (maybeSession && !sessionId) {
      // A session already exists for this username
      // Require user to provide sessionId to rejoin
      res.status(403).json({ error: 'Username already exists' })
      return
    }
    if (maybeSession && sessionId && maybeSession.sessionId !== sessionId) {
      res.status(403).json({ error: 'Invalid sessionId' })
      return
    }
    res.status(200).send()
  })
}
