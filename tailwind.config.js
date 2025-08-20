module.exports = {
  variants: {
    animation: ['motion-safe'],
  },
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './sections/**/*.{js,ts,jsx,tsx,mdx}',
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
          orange: {
            DEFAULT: '#FF5E18',
            light: '#FF8C4D',
            dark: '#CC4B14',
          },
          black: {
            DEFAULT: '#141414',
            light: '#333333',
            dark: '#000000',
          },
        },
        gray: {
          50: '#F9FAFB',
          100: '#F3F4F6',
          200: '#E5E7EB',
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#6B7280',
          600: '#4B5563',
          700: '#374151',
          800: '#1F2937',
          900: '#111827',
        },
      },
      fontFamily: {
        'vinila-extended': ['Vinila Extended', 'sans-serif'],
        'vinila-extended-bold': ['Vinila Extended Bold', 'sans-serif'],
        'vinila-extended-light': ['Vinila Extended Light', 'sans-serif'],
        roboto: ['Roboto', 'sans-serif'],
      },
      margin: {
        4: '1.5rem',
      },
      fontSize: {
        h1: '120px',
        h2: '96px',
        h3: '70px',
        h4: '56px',
        'font-subtitle-1': '56px',
        'font-subtitle-2': '32px',
        'font-subtitle-3': '24px',
        'font-subtitle-3-uppercase': '24px',
        'font-subtitle-3-bold': '24px',
        'font-subtitle-3-regular': '24px',
        'font-subtitle-4': '20px',
        'font-body-2-bold': '14px',
        'font-body-2-regular': '14px',
        'font-button': '18px',
        'font-button-bold': '16px',
        'font-button-regular': '16px',
      },
    },
  },
  plugins: [],
};
