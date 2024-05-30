/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        neutral: {
          200: "#d1d1d1",
          500: "#726E6B",
          600: "#5D5B5A",
        },
        beige: {
          light: "#f5f0ea",
          dark: "#C3BDB8",
        },
        brown: {
          200: "#F0E6DE",
          400: "#827060",
          700: "#5D544C",
        },
        blue: "#4459C4",
      },
    },
  },
  plugins: [],
};
