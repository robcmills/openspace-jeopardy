import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { App } from './App'
import { Provider } from 'jotai'
import { jotaiStore } from './jotaiStore'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={jotaiStore}>
      <App />
    </Provider>
  </StrictMode>,
)
