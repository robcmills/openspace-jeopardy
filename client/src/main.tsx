import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import { Provider } from 'jotai'
import { jotaiStore } from './jotaiStore'
import { RouterProvider } from 'react-router-dom'
import { router } from './router'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={jotaiStore}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>,
)
