import { useSetAtom } from 'jotai'
import { MouseEventHandler, useState } from 'react'
import { socketAtom } from './socketAtom'
import { socket } from './socket'
import { centerFill } from './styles'
// import { useParams } from 'react-router-dom'
// import { useIsHost } from './useIsHost'

export function UsernameForm() {
  console.log('UsernameForm render')
  // const { gameId } = useParams()
  // const isGameRoute = !!gameId
  // const isHost = useIsHost()

  const setSocketAtom = useSetAtom(socketAtom)

  const [value, setValue] = useState('')
  const onChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
    setValue(event.target.value)
  }

  const isUsernameValid = !!value

  // const onSubmit: React.FormEventHandler = (event) => {
  //   event.preventDefault()
  //   if (!value) {
  //     alert('Please enter a username')
  //     return
  //   }
  //   setSocketAtom(prev => ({ ...prev, username: value }))
  //   socket.auth = { username: value }
  //   socket.connect()
  // }

  // const joinGameAsContestant: MouseEventHandler<HTMLButtonElement> =
  //   (event) => {
  //     event.preventDefault()
  //     console.log('joinGameAsContestant')
  //   }
  //
  // const joinGameAsSpectator: MouseEventHandler<HTMLButtonElement> =
  //   (event) => {
  //     event.preventDefault()
  //     console.log('joinGameAsSpectator')
  //   }

  const submit: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.preventDefault()
    setSocketAtom(prev => ({ ...prev, username: value }))
    socket.auth = { username: value }
    socket.connect()
    // if (gameId) socket.emit('joinGame', gameId)
  }

  // const buttons = isGameRoute && !isHost ? (
  //   <>
  //     <button
  //       disabled={!isUsernameValid}
  //       onClick={joinGameAsContestant}
  //     >
  //       Join as Contestant
  //     </button>
  //     <button
  //       disabled={!isUsernameValid}
  //       onClick={joinGameAsSpectator}
  //     >
  //       Join as Spectator
  //     </button>
  //   </>
  // ) : (
  //   <button
  //     disabled={!isUsernameValid}
  //     onClick={submit}
  //   >
  //     Submit
  //   </button>
  // )

  return (
    <main style={centerFill}>
      <form>
        <div>
          <label>Username: &nbsp; </label>
        </div>
        <div style={{ display: 'grid', gap: 3 }}>
          <input onChange={onChange} type='text' value={value} />
          <button
            disabled={!isUsernameValid}
            onClick={submit}
          >
            Submit
          </button>
        </div>
      </form>
    </main>
  )
}
