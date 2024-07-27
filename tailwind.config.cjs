module.exports = {
  // https://tailwindcss.com/docs/content-configuration
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'media', // or 'class'
  theme: {
    // https://v2.tailwindcss.com/docs/theme
    extend: {
      colors: {},
      keyframes: {},
      animation: {},
      screens: {
        xs: '480px'
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
}
