/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      height: {
        128: "40rem",
      },
      width: {
        108: "30rem",
        128: "40rem",
      },
      colors: {
        orange: "#ff9100",
        purple: "#3f3cbb",
        night: "#282828",
        darknight: "#1c1c1c",
        midnight: "#121063",
        "bubble-gum": "#ff77e9",
        bermuda: "#78dcca",
      },
    },
  },
  plugins: [require("tailwind-scrollbar-hide")],
};
