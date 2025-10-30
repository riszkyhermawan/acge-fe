/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      colors: {
        "error": "#CF1E2E",
        "error-dark": "#34070B",
      },
    },
  },

  plugins: [],
};
