const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", ...defaultTheme.fontFamily.sans],
        serif: ["Source\\ Serif\\ 4", ...defaultTheme.fontFamily.serif],
      },
      colors:{
        verde: '#05FF00',
        violeta: '#891FF3',
        amarillo: '#FFFF00'
      }
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
