import { useSetAtom } from 'jotai'
import { useState } from 'react'
import { socketAtom } from './socketAtom'
import { socket } from './socket'
import { centerFill } from './styles'

export function UsernameForm() {
  const setSocketAtom = useSetAtom(socketAtom)
  const [value, setValue] = useState('')
  const onChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setValue(event.target.value)
  }
  const onSubmit: React.FormEventHandler = (event) => {
    event.preventDefault()
    if (!value) {
      alert('Please enter a username')
      return
    }
    setSocketAtom(prev => ({ ...prev, username: value }))
    socket.auth = { username: value };
    socket.connect()
  }
  return (
    <main style={centerFill}>
      <form onSubmit={onSubmit}>
        <div>
          <label>Username: &nbsp; </label>
        </div>
        <div>
          <input onChange={onChange} type='text' value={value} /> &nbsp;
          <button type='submit'>Submit</button>
        </div>
      </form>
    </main>
  )
}
