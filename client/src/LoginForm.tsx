import { useSetAtom } from 'jotai'
import { MouseEventHandler, useState } from 'react'
import { socketAtom } from './socketAtom'
import { socket } from './socket'
import { centerFill } from './styles'

const mainStyle = {
  ...centerFill,
}

export function LoginForm() {
  const setSocketAtom = useSetAtom(socketAtom)

  const [isExistingUser, setIsExistingUser] = useState(false)

  const [username, setUsername] = useState('')
  const onChangeUsername: React.ChangeEventHandler<HTMLInputElement> = (
    event,
  ) => {
    setUsername(event.target.value)
  }
  const isUsernameValid = !!username

  const [sessionId, setSessionId] = useState('')
  const onChangeSessionId: React.ChangeEventHandler<HTMLInputElement> = (
    event,
  ) => {
    setSessionId(event.target.value)
  }
  const isSessionIdValid = !!sessionId

  const submitUsername: MouseEventHandler<HTMLButtonElement> = async (
    event,
  ) => {
    event.preventDefault()
    try {
      const response = await fetch(`/login?username=${username}`, {
        method: 'POST',
      })
      if (!response.ok) {
        const { error } = await response.json()
        if (error === 'Username already exists') {
          setIsExistingUser(true)
          return
        }
        console.error(error)
        return
      }
      setSocketAtom((prev) => ({ ...prev, username: username }))
      socket.auth = { username: username }
      socket.connect()
    } catch (error) {
      console.error(error)
    }
  }

  const submitSessionId: MouseEventHandler<HTMLButtonElement> = async (
    event,
  ) => {
    event.preventDefault()
    try {
      const response = await fetch(
        `/login?username=${username}&sessionId=${sessionId}`,
        {
          method: 'POST',
        },
      )
      if (!response.ok) {
        const { error } = await response.json()
        console.error(error)
        return
      }
      localStorage.setItem('sessionId', sessionId)
      setSocketAtom((prev) => ({ ...prev, sessionId, username }))
      socket.auth = { sessionId, username }
      socket.connect()
    } catch (error) {
      console.error(error)
    }
  }

  const usernameInput = (
    <>
      <div>
        <label>Username: &nbsp; </label>
      </div>
      <div style={{ display: 'grid', gap: 4 }}>
        <input onChange={onChangeUsername} type="text" value={username} />
        <button disabled={!isUsernameValid} onClick={submitUsername}>
          Login
        </button>
      </div>
    </>
  )

  const sessionIdInput = (
    <>
      <h3>Welcome back, {username}!</h3>
      <div>
        <label>SessionId: &nbsp; </label>
      </div>
      <div style={{ display: 'grid', gap: 4 }}>
        <input onChange={onChangeSessionId} type="text" value={sessionId} />
        <button disabled={!isSessionIdValid} onClick={submitSessionId}>
          Login
        </button>
      </div>
    </>
  )

  const input = isExistingUser ? sessionIdInput : usernameInput

  return (
    <main style={mainStyle}>
      <form>
        <h1>Jeopardy!</h1>
        {input}
      </form>
    </main>
  )
}
