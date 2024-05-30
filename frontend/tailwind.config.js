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
      },
    },
  },
  plugins: [],
};
