/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        galgo: ['"Galgo Condensed"', 'sans-serif'],
        sans: ['"Galgo Condensed"', 'Manrope', 'sans-serif'],
      },
      colors: {
        hunt: {
          dark: '#1B5E20',       // Deep forest green
          mid: '#66BB6A',        // Vibrant crop green
          light: '#A5D6A7',      // Soft pastel green
          mint: '#E8F5E9',       // Clean pale mint / background
        },
        paddy: {
          50: '#E8F5E9',
          100: '#C8E6C9',
          200: '#A5D6A7',
          300: '#81C784',
          400: '#66BB6A',
          500: '#4CAF50',
          600: '#43A047',
          700: '#388E3C',
          800: '#2E7D32',
          900: '#1B5E20',
          950: '#0c2e10',
        }
      },
      boxShadow: {
        'inner-glow': 'inset 0 0 20px rgba(102, 187, 106, 0.2), inset 0 1px 1px rgba(232, 245, 233, 0.3)',
        'inner-glow-hover': 'inset 0 0 30px rgba(102, 187, 106, 0.35), inset 0 2px 4px rgba(232, 245, 233, 0.4), 0 12px 30px -8px rgba(27, 94, 32, 0.4)',
      }
    },
  },
  plugins: [],
}
