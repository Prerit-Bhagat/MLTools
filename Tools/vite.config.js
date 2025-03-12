import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: "/MLTools/", // Must match your GitHub Pages repo name
  plugins: [react()],
});