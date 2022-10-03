/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js}'],
  theme: {
    extend: {},
    colors: {
      'nord-dark-1': '#242933',
      'nord-dark-2': '#2E3440',
      'nord-dark-3': '#3B4252',
      'nord-dark-4': '#434C5E',
      'nord-dark-5': '#4C566A',

      'nord-light-1': '#D8DEE9',
      'nord-light-2': '#E5E9F0',
      'nord-light-3': '#ECEFF4',

      'nord-frost-1': '#8FBCBB',
      'nord-frost-2': '#88C0D0',
      'nord-frost-3': '#81A1C1',
      'nord-frost-4': '#5E81AC',

      'nord-aurora-1': '#BF616A',
      'nord-aurora-2': '#D08770',
      'nord-aurora-3': '#EBCB8B',
      'nord-aurora-4': '#A3BE8C',
      'nord-aurora-5': '#B48EAD',
    },
    fontFamily: {
      sans: ['Rubik', 'Roboto', 'sans-serif'],
      fontDic: ['Roboto', 'sans-serif'],
    },
  },
  plugins: [],
};
