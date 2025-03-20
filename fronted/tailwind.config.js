/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        my: ["Nunito Sans"], // Adding Lexend Deca font
        my1: ["Abril Fatface"],
        my2: ["Pinyon Script"],
        my3: ["Michroma"],
      },
      
    },
  },
  plugins: [],
}

