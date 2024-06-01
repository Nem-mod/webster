/** @type {import('tailwindcss').Config} */
import {nextui} from '@nextui-org/react'
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
        colors: {
            primary: '#BB7EFF',
            accent: '#7743DB',
            accentSecond: '#9960FC',
            secondary: '#DD9DFF',
            light: '#FFBDFF',
        },
    },
},
  darkMode: "class",
  plugins: [nextui()]
}