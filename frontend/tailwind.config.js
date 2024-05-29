/** @type {import('tailwindcss').Config} */

export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        neutral: {
          500: "#726E6B",
          600: "#5D5B5A",
        },
        beige: {
          dark: "#C3BDB8",
        },
      },
    },
  },
  plugins: [],
};
