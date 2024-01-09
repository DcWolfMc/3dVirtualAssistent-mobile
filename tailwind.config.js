/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./App.{js,jsx,ts,tsx}", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: [, "Inter", "sans-serif"],
        roboto: ["Roboto", "sans-serif"],
      },
    },
    variants: {
      backgroundColor: ['responsive', 'hover', 'focus', 'active', 'disabled'],
      opacity:["disabled"],
      textColor: ['responsive', 'hover', 'focus', 'active', 'disabled'],
    },
  },
  plugins: [],
};
