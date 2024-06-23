import { atom } from 'jotai'
import { FinalJeopardyState } from './FinalJeopardyState'

const initialFinalJeopardyState: FinalJeopardyState = {
  answer: '',
  category: '',
  step: 'logo',
}

export const finalJeopardyAtom = atom(initialFinalJeopardyState)
