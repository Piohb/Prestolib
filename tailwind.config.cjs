/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx,vue}",
  ],
  theme: {
    screens: {
      'xs': '420px',
      'xsm': '576px',
      'smd': '694px',
      'md': '768px',
      'dlg': '992px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px'
    },
    extend: {
      colors: {
        white: '#ffffff',
        primary: '#4338ca',
        fade: '#71717a',
        yuppi: '#a041ea'
      }
    },
  },
  plugins: [],
}
