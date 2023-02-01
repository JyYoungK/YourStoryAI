/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    colors: {
      red: "#ff0000",
      white: "#ffffff",
      purple: "#3f3cbb",
      night: "#282828",
      darknight: "#1c1c1c",
      midnight: "#121063",
      metal: "#565584",
      tahiti: "#3ab7bf",
      silver: "#ecebff",
      "bubble-gum": "#ff77e9",
      bermuda: "#78dcca",
    },
    extend: {
      height: {
        128: "40rem",
      },
      width: {
        108: "30rem",
        128: "40rem",
      },
    },
  },
};
