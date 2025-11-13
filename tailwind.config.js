module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './pages/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          black: '#000',
          white: '#fff'
        }
      },
      fontFamily: {
        serifBrand: ['"Times New Roman"', 'Georgia', 'serif'],
        ui: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif']
      }
    }
  },
  plugins: []
}
