/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    'node_modules/preline/dist/*.js',
    'node_modules/flowbite-react/lib/esm/**/*.js',
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#6F5EE0',
        'danger': '#EB5757',
        'warning':'#FFD43E',
        'pass':'#27AE60',
        'info':'#2F80ED',
        'sec':'#DF3F69',
        'grey': '#9CA3AF',
      },
    }
  },
  plugins: [
    require('preline/plugin'),
    require('flowbite/plugin'),
  ],
}

