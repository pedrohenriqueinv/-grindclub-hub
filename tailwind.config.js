/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        grind: {
          bg: '#080b11',
          panel: '#0f141f',
          border: '#1e2638',
          hover: '#182032',
          card: '#121927',
          cyan: '#06b6d4',
          gold: '#f59e0b',
          green: '#10b981',
          blue: '#3b82f6',
        }
      }
    },
  },
  plugins: [],
}
