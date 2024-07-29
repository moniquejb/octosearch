import extend from './src/tailwind/extend'

module.exports = {
  // https://tailwindcss.com/docs/content-configuration
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'media',
  theme: {
    // https://v2.tailwindcss.com/docs/theme
    extend: {
      colors: extend.colors,
      keyframes: extend.keyframes,
      animation: extend.animation,
      screens: extend.screens,
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
