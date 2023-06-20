/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    screens: {
      xxs: '375px',
      xss: '390px',
      xxm: '425px',
      smm: '640px',
      mdd: '768px',
      lgg: '1024px',
      'lgg+1': '1200px',
      xl:'1440px',
      xxl:'2560'
    },
    extend: {},
  },
  plugins: [],
}
