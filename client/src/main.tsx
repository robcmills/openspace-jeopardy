import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { Provider as JotaiProvider } from 'jotai'
import { jotaiStore } from './jotaiStore'
import { RouterProvider } from 'react-router-dom'
import { router } from './router'

import './socket'

const rootElement = document.getElementById('root')
if (!rootElement) throw new Error('Root element not found')
createRoot(rootElement).render(
  <StrictMode>
    <JotaiProvider store={jotaiStore}>
      <RouterProvider router={router} />
    </JotaiProvider>
  </StrictMode>,
)
