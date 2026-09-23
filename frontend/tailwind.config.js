/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Manrope', 'sans-serif'],
      },
      colors: {
        maroon: {
          50: '#fdf2f4',
          100: '#fce7ea',
          200: '#f9d2d9',
          300: '#f4adb9',
          400: '#eb7b8f',
          500: '#dc4e67',
          600: '#c4304c',
          700: '#a5223a',
          800: '#800020', // classic deep rich maroon
          900: '#540817', // midnight wine
          950: '#32030c', // deepest black-maroon
        },
        paddy: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
          950: '#052e16',
        }
      },
      boxShadow: {
        'inner-glow': 'inset 0 0 20px rgba(255, 255, 255, 0.08), inset 0 1px 1px rgba(255, 255, 255, 0.15)',
        'inner-glow-hover': 'inset 0 0 30px rgba(255, 255, 255, 0.15), inset 0 2px 4px rgba(255, 255, 255, 0.25), 0 12px 30px -8px rgba(80, 0, 32, 0.35)',
        'inner-card': 'inset 0 1px 0 rgba(255, 255, 255, 0.12), inset 0 0 16px rgba(128, 0, 32, 0.15)',
        'inner-card-hover': 'inset 0 1px 0 rgba(255, 255, 255, 0.3), inset 0 0 24px rgba(255, 255, 255, 0.1), 0 16px 36px -10px rgba(50, 3, 12, 0.5)',
      }
    },
  },
  plugins: [],
}
