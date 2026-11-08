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
        autocad: {
          red: '#E51020',       // Iconic AutoCAD Crimson Red
          redHover: '#C40816',  // Darker red for hover
          redLight: '#FF3344',  // Bright accent red
          redDark: '#800008',   // Deep wine red
          black: '#0A0A0A',     // Deepest black
          dark: '#121212',      // Dark charcoal
          panel: '#1A1A1A',     // Card panel
          card: '#242424',      // Elevated card
          border: '#333333',    // Clean dark border
          borderLight: '#4B5563',
          white: '#FFFFFF',
          textMuted: '#9CA3AF',
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
