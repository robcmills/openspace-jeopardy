import { Contestants } from './Contestants'

export function Side() {
  const sideStyle = {
    display: 'grid',
  }

  return (
    <div style={sideStyle}>
      <Contestants />
    </div>
  )
}
