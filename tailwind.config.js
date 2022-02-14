module.exports = {
  variants: {
    animation: ["motion-safe"]
  },
  darkMode: 'class',
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        fadeIn: "fadeIn 2s ease-in forwards"
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0 },
          "100%": { opacity: 1 }
        }
      },
      colors: {
        brand: {
          'orange': '#FF5E18',
          'black': '#121212',
        }
      },
      fontFamily: {
        'vinila-extended': ['Vinila Extended'],
        'vinila-extended-bold': ['Vinila Extended Bold'],
        'vinila-extended-light': ['Vinila Extended Light'],
        'roboto': ['Roboto'],
      }
    },
  },
  plugins: [],
}
