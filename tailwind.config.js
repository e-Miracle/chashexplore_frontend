/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        ubuntu: ['"Ubuntu"', "sans-serif"],
      },
      boxShadow: {
        normal: "0px 4px 100px rgba(31, 82, 174, 0.1)",
      },
    },
    colors: {
      primary: "#1F52AE",
      white: "#fff",
      labels: "#394355",
      labelLight: "#646C79",
      heading: "#232E43",
      icon: "#4E5767",
      secondary: "#FBFBFD",
    },
  },
  plugins: [],
};