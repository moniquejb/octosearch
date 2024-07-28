const extend = {
  colors: {},
  keyframes: {
    wave: {
      '0%': { transform: 'rotate(0)' },
      '50%, 100%': { transform: 'rotate(10deg)' },
      '25%, 75%': { transform: 'rotate(-3deg)' }
    },
    opacityInOut: {
      '0%': { opacity: 0.1 },
      '50%, 100%': { opacity: 1 },
      '25%, 75%': { opacity: 0.6 }
    },
    circular: {
      '0%': { transform: 'translate(-30px, 0)' },
      '25%': { transform: 'translate(0, -30px)' },
      '50%': { transform: 'translate(30px, 0)' },
      '75%': { transform: 'translate(0, 30px)' },
      '100%': { transform: 'translate(-30px, 0)' }
    }
  },
  animation: {
    wave: 'wave 5500ms ease-in-out 500ms infinite alternate both',
    'opacity-in-out': 'opacityInOut 3s ease-in-out infinite alternate both',
    circular: 'circular 2s ease-in-out infinite'
  },
  screens: {
    xs: '480px'
  }
}

export default extend
