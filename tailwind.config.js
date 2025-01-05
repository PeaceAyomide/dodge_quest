/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'press-start': ['"Press Start 2P"', 'cursive'],
        'cursive': ['Basic'],
      },},
    screens: {
      'ipad': {'max': '1200px'},
      'phone': {'max': '700px'},
      'small-phone': {'max': '320px'}
    }
  },
  plugins: [],
}
