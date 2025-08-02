// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'
// import tailwindcss from '@tailwindcss/vite'

// // https://vite.dev/config/
// export default defineConfig({
//   base: "/MLTools/", // Must match your GitHub Pages repo name
//   plugins: [react(),tailwindcss(),],
//   resolve: {
//     alias: {
//       '@pages': '/src/pages', // Alias to simplify import paths
//     },
//   },
// });
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import tailwindcss from "@tailwindcss/vite";

// https://vitejs.dev/config/
export default defineConfig({
  // base: "/MLTools/", // GitHub Pages base URL
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@pages": path.resolve(__dirname, "./src/pages"),
      "@layouts": path.resolve(__dirname, "./src/layouts"),
      "@NLP": path.resolve(__dirname, "./src/NLP"),
      "@ML": path.resolve(__dirname, "./src/ML"),
    },
  },
});
