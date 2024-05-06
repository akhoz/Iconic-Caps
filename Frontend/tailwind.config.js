/** @type {import('tailwindcss').Config} */
const flowbite = require("flowbite-react/tailwind");
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    flowbite.content(),

  ],
  theme: {
    extend: {
      backgroundImage: {
        'hero-right': "url(img/hero-right.png)",
        'hero-left': "url(img/hero-left.png)",

        'about': "url(img/about-banner.png)",
      }
    },
  },
  plugins: [
    flowbite.plugin(),
  ],
}

