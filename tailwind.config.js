/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    colors: {
      // generated with https://materialpalettes.com/
      "primary": "#D91424", // 700 <-- I wanted a blood red
      "primary-dark": "#9B0009", // 900 = primary + 200
      "primary-light": "#eb6b6d", // 300 = primary - 400
      "secondary": "#4b7b9b", // 500 <-- I wanted something metallic
      "secondary-dark": "#2f5973", // 700 = secondary + 200
      "secondary-light": "#7ea3bf", // 300
      "theme-black": "#000", // 900 <-- should have been #0d0d0d, but black makes for less work
      "theme-gray": "#5e5e5e", // 600
      "theme-white": "#fff", // 50 <-- should have been #f6f6f6, but white makes for less work
      "divider": "#a6a6a6", // 400
    },
    fontFamily: {
      'display': ['Permanent Marker'],
    }
  },
  plugins: [],
}
