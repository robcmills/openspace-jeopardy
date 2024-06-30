import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { html } from './html'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [html(), react()],
  build: {
    rollupOptions: {
      external: '/socket.io/socket.io.js',
    },
  },
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
      '/socket.io': {
        target: 'ws://localhost:3000',
        ws: true,
      },
    },
  },
})
