/** @type {import('tailwindcss').Config} */
import theme from "tailwindcss/defaultTheme";

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#7945FF",
        "primary-dark": "#5C2DD5",
        mustard: "#FFCE67",
        coral: "#FD6687",
      },
      fontFamily: {
        sans: ['"Space Grotesk"', ...theme.fontFamily.sans],
      },
    },
  },
  plugins: [],
};
