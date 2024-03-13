/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    screens: {
      sm: "480px",
      md: "768px",
      lg: "1048px",
      xl: "1440px",
    },
    colors: {
      textBlue: "#543EE0",
      textBlack: "#111111",
      textGrey: "#626262",
      bgCream: "#FFEDCC",
      textWhite: "#ffffff",
      bgIcon: "#D6D1F8",
      borderIcon: "#D0D0D0",
      textRed: "#FF1400",
    },
    fontFamily: {
      dmSans: ["DM Sans", "sans-serif"],
    },
    extend: {},
  },
  plugins: [],
};
