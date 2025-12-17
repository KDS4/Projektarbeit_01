import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  root: '.',
  server: {
    port: 5173,
    host: 'localhost',
    middlewareMode: false
  },
  optimizeDeps: {
    include: [
      'react',
      'react-dom',
      '@mui/material',
      '@mui/icons-material',
      '@mui/x-date-pickers'
    ],
    exclude: ['react-vega']
  }
})