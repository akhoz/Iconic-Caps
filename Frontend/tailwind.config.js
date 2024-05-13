/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'hero-right': "url(/img/hero-right.png)",
        'hero-left': "url(/img/hero-left.jpg)",

        'about': "url(/img/about.png)",
        'account': "url(/img/account.jpg)"
      }
    },
  },
  plugins: [],
}

