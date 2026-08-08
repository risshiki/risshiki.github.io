import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// `VITE_BASE` is set by the GitHub Actions workflow so the built asset URLs match
// the Pages URL (`/<repo>/` for a project site, `/` for a `<user>.github.io` site).
export default defineConfig({
  plugins: [react()],
  base: process.env.VITE_BASE || '/',
})
