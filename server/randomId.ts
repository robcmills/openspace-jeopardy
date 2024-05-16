import { randomBytes } from 'crypto'

export function randomId() {
  return randomBytes(8).toString('hex')
}
