/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          red: '#EF4444', // Emergency red
          dark: '#111827',
          light: '#F3F4F6'
        }
      }
    },
  },
  plugins: [],
}