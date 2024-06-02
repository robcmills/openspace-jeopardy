import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { Provider as JotaiProvider } from 'jotai'
import { jotaiStore } from './jotaiStore'
import { RouterProvider } from 'react-router-dom'
import { router } from './router'

// initialize socket
import './socket'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <JotaiProvider store={jotaiStore}>
      <RouterProvider router={router} />
    </JotaiProvider>
  </StrictMode>,
)
