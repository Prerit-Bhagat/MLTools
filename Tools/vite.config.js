import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'


// https://vite.dev/config/
export default defineConfig({
  base: "/MLTools/", // Must match your GitHub Pages repo name
  plugins: [react(),tailwindcss(),],
  resolve: {
    alias: {
      '@pages': '/src/pages', // Alias to simplify import paths
    },
  },
});
