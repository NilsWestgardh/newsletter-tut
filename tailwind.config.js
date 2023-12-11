/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          '50': '#eef1ff',
          '100': '#e0e5ff',
          '200': '#c7cffe',
          '300': '#a6affb',
          '400': '#8286f7',
          '500': '#6964f0',
          '600': '#5947e4',
          '700': '#4c39c9',
          '800': '#3f31a2',
          '900': '#362f80',
          '950': '#171334',
        },
      },
    },
  },
  plugins: [],
}
