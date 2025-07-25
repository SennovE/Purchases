import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: process.env.VITE_HOST || 'localhost',
    port: Number(process.env.VITE_PORT) || 3000,
    allowedHosts: ['purchases.ddns.net'],
  },
})
