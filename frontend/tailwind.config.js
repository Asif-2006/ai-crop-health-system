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
        script: ['Caveat', 'cursive'],
      },
      colors: {
        forest: {
          900: '#11291C',
          800: '#173626',
          700: '#1F4532',
          600: '#2A5840',
        },
        rice: {
          dark: '#142E20',
          active: '#274C37',
          green: '#2E7D32',
          accent: '#4ADE80',
          bg: '#F6F8F5',
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
        },
      },
    },
  },
  plugins: [],
}
