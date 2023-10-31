/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: ["class"],
  theme: {
    extend: {
      colors: {
        "primary-bg": "#F5F5F5",
        "secondary-bg": "#ffffff",
        "primary-text": "#000000",
        "darkMode-bg": "#000000",
        "secondary-darkMode-bg": "#171717",
        "darkMode-text": "#ffffff",
        "title-color": "#e85a4f",
      },
    },
  },
  plugins: [],
};
