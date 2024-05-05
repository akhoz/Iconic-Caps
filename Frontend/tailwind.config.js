/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'hero-right': "url(img/hero-right.png)",
        'hero-left': "url(img/hero-left.png)",
      }
    },
  },
  plugins: [],
}

