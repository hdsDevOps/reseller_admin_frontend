module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        inter: ["Inter", "sans-serif"],
        montserrat: ["Montserrat", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
      },
      colors: {
        cGreen: '#12A833',
        cGreen2: '#CDE9D3',
        cGreen3: '#F3FAF7',
        cGreen4: '#ECFFF0',
        cBlue: '#0084FF',
        cBlue2: '#0066FF',
        cBlue3: '#0D121F',
        cBlue4: '#0084ff33',
        cBlue5: '#2B41FF',
        cWhite: '#E4E4E4',
        cWhite2: '#F9F9F9',
        cWhite3: '#F4F4F4',
        cWhite4: '#F0F0F3',
        cWhite5: '#F9FAFB',
        cWhite6: '#CDCDCD',
        cRed: '#E02424',
        cRed2: '#F9DEDC',
        cGray: '#8A8A8A',
        cGray2: '#8E8E8E',
        cGray3: '#3A3A3A',
        cGray4: '#C4C4C4',
        cBlack: '#151515',
        cBlack2: '#222222',
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
