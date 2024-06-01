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
            // primary: '#BB7EFF',
            // accent: '#7743DB',
            // accentSecond: '#9960FC',
            // secondary: '#DD9DFF',
            // light: '#FFBDFF',

            // primary: {
            //     DEFAULT: '#26355D',
            //     light: '#3b4e81',
            //     dark: '#1a2442',
            // },
            // secondary: {
            //     DEFAULT: '#AF47D2',
            //     light: '#c067e3',
            //     dark: '#8a37a7',
            // },
            // accent: {
            //     DEFAULT: '#FF8F00',
            //     light: '#ffb34d',
            //     dark: '#cc7200',
            // },
            // accentSecond: {
            //     DEFAULT: '#FF8F00', // Keeping the same as accent for consistency
            //     light: '#ffb34d',
            //     dark: '#cc7200',
            // },
            // light: {
            //     DEFAULT: '#FFDB00',
            //     light: '#ffeb4d',
            //     dark: '#ccaf00',
            // },

            // primary: {
            //     DEFAULT: '#1E0342',
            //     light: '#341063',
            //     dark: '#14022D',
            // },
            // secondary: {
            //     DEFAULT: '#0E46A3',
            //     light: '#3567b3',
            //     dark: '#082f75',
            // },
            // accent: {
            //     DEFAULT: '#9AC8CD',
            //     light: '#b3d6d9',
            //     dark: '#7fa4a7',
            // },
            // accentSecond: {
            //     DEFAULT: '#E1F7F5',
            //     light: '#e7f8f6',
            //     dark: '#c4e0df',
            // },
            // light: {
            //     DEFAULT: '#E1F7F5', // Using the very light blue color for light
            //     light: '#e7f8f6',
            //     dark: '#c4e0df',
            // },

            // primary: {
            //     DEFAULT: '#151515',
            //     light: '#2E2E2E',
            //     dark: '#0A0A0A',
            // },
            // secondary: {
            //     DEFAULT: '#A91D3A',
            //     light: '#BF3F5A',
            //     dark: '#7F1429',
            // },
            // accent: {
            //     DEFAULT: '#C73659',
            //     light: '#DB577A',
            //     dark: '#931F41',
            // },
            // accentSecond: {
            //     DEFAULT: '#EEEEEE',
            //     light: '#F4F4F4',
            //     dark: '#CCCCCC',
            // },
            // light: {
            //     DEFAULT: '#EEEEEE', // Using the very light gray for light
            //     light: '#F4F4F4',
            //     dark: '#CCCCCC',
            // },

            primary: {
                DEFAULT: '#141E46',
                light: '#2B3465',
                dark: '#0F1532',
            },
            secondary: {
                DEFAULT: '#41B06E',
                light: '#63C28B',
                dark: '#318856',
            },
            accent: {
                DEFAULT: '#8DECB4',
                light: '#A3F0C5',
                dark: '#6CD49B',
            },
            accentSecond: {
                DEFAULT: '#FFF5E0',
                light: '#FFF9EB',
                dark: '#E6DBC8',
            },
            light: {
                DEFAULT: '#FFF5E0', // Using the light cream color for light
                light: '#FFF9EB',
                dark: '#E6DBC8',
            },
        },
    },
},
  darkMode: "class",
  plugins: [nextui()]
}