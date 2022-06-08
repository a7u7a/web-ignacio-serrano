const defaultTheme = require("tailwindcss/defaultTheme");

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontSize: {
        "7xl": "10rem",
      },
      fontFamily: {
        sans: ["Inter", ...defaultTheme.fontFamily.sans],
        serif: ["Source\\ Serif\\ 4", ...defaultTheme.fontFamily.serif],
      },
      colors: {
        verde: "#05FF00",
        violeta: "#891FF3",
        amarillo: "#FFFF00",
        rojo:"#FF0000"
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
