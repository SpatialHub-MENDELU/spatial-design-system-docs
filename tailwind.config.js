/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './index.html',
    './src/**/*.{vue,js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'border-color': '#e5e7eb',
        'grey': '#B7B4B4',
        'primary': '#00BA92',
        'dark-text': '#3C3C43'
      }
    },
  },
  plugins: [],
}

