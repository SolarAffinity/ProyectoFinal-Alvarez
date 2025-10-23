import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Quita base si publicas en dominio raíz de Vercel:
  // base: '/',
  build: {
    outDir: 'dist'
  }
})
