## New user, no sessionId

client                 server         localStorage

→  get /games/:gameId                 null

            index.html ← 

main.tsx

// socket.ts (initialize)
sessionId = localStorage.getItem('sessionId')
if (sessionId) { // null
  socket.auth = { sessionId }
  socket.connect()
}

// RootRoute.tsx
if not sessionId
  return <UsernameForm />
if not connected
  return <Connecting />
return <Outlet />

// UsernameForm.tsx
socket.auth = { username }
socket.connect()

                      // useSessionMiddleware.ts
                      sessionId = socket.handshake.auth.sessionId
                      if sessionId
                        session = store.getSession(sessionId)
                        if session
                          socket.data = session
                          return next()
                        else
                          return error // session expired

                      if not socket.handshake.auth.username
                        return error

                      socket.data = store.createSession()

                      // onConnection.ts
                      sessionStore.set(sessionId, socket.data)
                      socket.emit('session', socket.data)
                      socket.emit('users', sessionStore.getUsers())
                      socket.emit('games', gamesStore.getAll())
                      socket.broadcast.emit('userConnected', socket.data)

// onSocketSessionEvents.ts
socket.on('connect', () => {
  jotaiStore.set(socketAtom, { isConnected: true })

socket.on('session', (data) => {
  socket.auth = { sessionId }
  localStorage.setItem('sessionId', sessionId)
  jotaiStore.set(socketAtom, data)

