module.exports = {
  variants: {
    animation: ['motion-safe'],
  },
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './node_modules/tw-elements/dist/js/**/*.js',
  ],
  theme: {
    screens: {
      '2xs': '280px',
      xs: '320px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
      '2xl': '1536px',
      'lg-max': { max: '1300px' },
      'md-max': { max: '1040px' },
      'sm-max': { max: '590px' }
    },
    extend: {
      width: {
        'full-1': 'calc(100% + 1px)'
      },
      height: {
        'full-1': 'calc(100% + 1px)'
      },
      spacing: {
        '6.5': '1.625rem',
        '7.5': '1.875rem',
        '13.5': '3.75rem',
        '15': '3.75rem',
        '16.5': '4.5rem',
        '20.5': '5.375rem',
        '24.5': '6.5rem'
      },
      animation: {
        fadeIn: 'fadeIn 2s ease-in forwards',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
      },
      colors: {
        main: {
          border: '#343436'
        },
        dark: {
          DEFAULT: '#121212'
        },
        brand: {
          orange: '#FF5E18',
          'orange-hover': '#CC4B13',
          'orange-active': '#A63D10',
          black: '#141414',
        },
        transparent: {
          '20': 'rgba(255, 255, 255, 0.20)',
        },
        card: {
          'transparent-2': 'rgba(59, 59, 59, 0.15)',
          'transparent-3': 'rgba(114, 114, 114, 0.15)',
        },
        background: {
          DEFAULT: '#1B1B1C',
          opacity: 'rgba(81, 81, 81, 0.15)',
          transparent: 'rgba(59, 59, 59, 0.15)',
          card: '#222224',
          'cardDark': '#1B1B1C',
        },
        secondary: {
          DEFAULT: '#ACACB0',
          focus: '#402022',
          gray: '#616163',
          green: '#19B28D',
          red: '#EE505A',
        },
      },
      fontFamily: {
        'vinila-test': ['Vinila Test', 'sans-serif'],
        'vinila-extended': ['Vinila Extended', 'sans-serif'],
        'vinila-extended-bold': ['Vinila Extended Bold', 'sans-serif'],
        'vinila-extended-light': ['Vinila Extended Light', 'sans-serif'],
        roboto: ['Roboto', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
      bgGradientDeg: {
        158: '158deg',
      },
      gridTemplateColumns: {
        'bordered': '1fr 60px',
        'bordered-lg': '1fr 40px',
        'bordered-md': '40px 1fr 40px',
        'bordered-sm': '20px 1fr 20px',
        'exchanges': '185px 158px 70px 85px 84px',
        'exchanges-md': '100px 123px 54px 85px 55px',
        'wallets': '185px 124px 109px 136px 84px',
        'wallets-md': '133px 92px 90px 115px 54px',
      },
      gridTemplateRows: {
        'bordered': '60px 1fr 60px',
        'bordered-lg': '40px 1fr 40px',
        'bordered-md': '40px 1fr',
        'bordered-sm': '20px 1fr'
      },
      boxShadow: {
        'focus': '0px 0px 0px 4px rgba(238, 80, 90, 0.20)',
      }
    },
  },
  plugins: [require('tw-elements/dist/plugin'), require('tailwindcss-gradient')],
};
