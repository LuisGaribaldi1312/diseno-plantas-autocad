/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        cad: {
          dark: '#12161a',
          board: '#181e24',
          panel: '#1f2730',
          border: '#2e3a47',
          accent: '#0284c7', // Blueprint blue
          gold: '#f59e0b',   // Safety/Industrial amber
          green: '#10b981',  // Safe/Complete green
          red: '#ef4444',    // Warning red
          cyan: '#06b6d4',   // CAD crosshair cyan
        }
      },
      fontFamily: {
        mono: ['Fira Code', 'Cascadia Code', 'Consolas', 'monospace'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      }
    },
  },
  plugins: [],
}
