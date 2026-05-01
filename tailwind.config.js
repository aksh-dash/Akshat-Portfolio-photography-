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
          dark: "#080808", // Background
          surface: "#111111", // Surface
          gold: "#C9A84C", // Primary gold
          blue: "#7B9FD4", // Cool accent
          text: "#F5F0EB", // Text primary
          muted: "#888888", // Text muted
        }
      },
      fontFamily: {
        display: ['"Playfair Display"', '"Cormorant Garamond"', 'serif'],
        sans: ['"Inter"', '"DM Sans"', 'sans-serif'],
      },
      letterSpacing: {
        widest: '0.2em',
      }
    },
  },
  plugins: [],
}
