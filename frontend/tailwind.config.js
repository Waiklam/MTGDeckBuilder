/** @type {import('tailwindcss').Config} */
module.exports = {
  variants: {
    extend: {
        display: ["group-hover"],
    },
  },
  darkMode: 'media',
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./src/*.{js,jsx,ts,tsx}",
    'node_modules/preline/dist/*.js',
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('preline/plugin'),
    require('daisyui')
  ],
}

