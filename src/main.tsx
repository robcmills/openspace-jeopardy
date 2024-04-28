import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { App } from './App'
import { tilesStore } from './tilesAtoms'
import { Provider } from 'jotai'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={tilesStore}>
      <App />
    </Provider>
  </StrictMode>,
)
