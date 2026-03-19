/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        violet: {
          500: '#7c3aed',
          600: '#6d28d9',
        },
      },
    },
  },
  plugins: [],
}