module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    color: {
      blue: {
        400: 'var(--blue)',
      },
      red: {
        400: 'var(--red)',
      },
    },
    extend: {
      width: {
        '110%': '110%',
        '130%': '130%',
      },
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
  important: true,
}
