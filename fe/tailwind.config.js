/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: ["class"],
  theme: {
    extend: {
      colors: {
        "primary-bg": "#eae7dc",
        "primary-text": "#000000",
        "darkMode-bg": "#121212",
        "darkMode-text": "#ffffff",
        "title-color": "#e85a4f",
      },
    },
  },
  plugins: [],
};
