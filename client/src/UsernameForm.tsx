import { useSetAtom } from 'jotai'
import { MouseEventHandler, useState } from 'react'
import { socketAtom } from './socketAtom'
import { socket } from './socket'
import { centerFill } from './styles'

const mainStyle = {
  ...centerFill,
}

export function UsernameForm() {
  const setSocketAtom = useSetAtom(socketAtom)

  const [value, setValue] = useState('')
  const onChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setValue(event.target.value)
  }

  const isUsernameValid = !!value

  const submit: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault()
    setSocketAtom((prev) => ({ ...prev, username: value }))
    socket.auth = { username: value }
    socket.connect()
  }

  return (
    <main style={mainStyle}>
      <form>
        <h1>Jeopardy!</h1>
        <div>
          <label>Username: &nbsp; </label>
        </div>
        <div style={{ display: 'grid', gap: 3 }}>
          <input onChange={onChange} type="text" value={value} />
          <button disabled={!isUsernameValid} onClick={submit}>
            Login
          </button>
        </div>
      </form>
    </main>
  )
}
