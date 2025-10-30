import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'




// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      colors: {
        "error": "#CF1E2E",
        "error-dark": "#34070B",
      },
    },
  },
});



