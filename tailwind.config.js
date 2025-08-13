module.exports = {
  variants: {
    animation: ['motion-safe'],
  },
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './sections/**/*.{js,ts,jsx,tsx,mdx}',
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
    },
    extend: {
      animation: {
        fadeIn: 'fadeIn 2s ease-in forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
      },
      colors: {
        brand: {
          orange: '#FF5E18',
          black: '#141414',
        },
      },
      fontFamily: {
        'vinila-extended': ['Vinila Extended', 'sans-serif'],
        'vinila-extended-bold': ['Vinila Extended Bold', 'sans-serif'],
        'vinila-extended-light': ['Vinila Extended Light', 'sans-serif'],
        roboto: ['Roboto', 'sans-serif'],
      },
    },
  },
  plugins: [require('tw-elements/dist/plugin')],
};
