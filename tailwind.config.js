/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        akblue: {
          50: "#f0fdfc",
          100: "#ccfbf1",
          200: "#99f6e4",
          300: "#5eead4",
          400: "#3cd4ba",
          500: "#00efe4",
          600: "#00c7b7",
          700: "#009c8e",
          800: "#00786a",
          900: "#005248",
          950: "#00241a"
        },
        akred: {
          50: "#fff0f5",
          100: "#ffd6e8",
          200: "#ffaed1",
          300: "#ff8ebc",
          400: "#ff6ba3",
          500: "#ff008b",
          600: "#e6007a",
          700: "#c8006e",
          800: "#a5005c",
          900: "#7a003c",
          950: "#40002d"
        },
        akpurple: {
          50: "#fcf2ff",
          100: "#e8d5ff",
          200: "#d0bfff",
          300: "#b99fdf",
          400: "#a16cc1",
          500: "#632674",
          600: "#4f1d5f",
          700: "#3f174c",
          800: "#2e1037",
          900: "#1c091f",
          950: "#0a0107"
        }
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))"
      }
    }
  },
  plugins: []
}
