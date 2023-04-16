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
        new: "0px 4px 4px rgba(0, 0, 0, 0.05)",
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
      bg: "#FBFBFD",
      rand: "#0D1A31",
      forms: "#646C79",
      formborder: "#DBDDE2",
    },
  },
  plugins: [],
};
