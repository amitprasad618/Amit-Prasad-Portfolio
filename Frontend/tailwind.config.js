/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        irctcBlue: '#1b365d',
        irctcDarkBlue: '#0f223f',
        irctcOrange: '#d97736',
        irctcLight: '#eef2f7',
      },
    },
  },
  plugins: [],
}