/* eslint-disable @typescript-eslint/no-var-requires */ /* eslint-disable prettier/prettier */
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  // important: true,
  // purge: [],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/container/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
  ],

  theme: {
    fontFamily: {
      inter: ["Inter"],
    },
    extend: {
      colors: {
        primary: {
          50: "#E2F6F8",
          100: "#B5E7EE",
          200: "#88D7E4",
          300: "#5EC7DC",
          400: "#40BBD8",
          500: "#22B0D6",
          600: "#16A2C8",
          700: "#008FB7",
          800: "#007EA4", // Primary
          900: "#005E84",
        },
        secondary: {
          50: "#FEECEF",
          100: "#FDD0D3",
          200: "#EDA09D",
          300: "#E27C78",
          400: "#EC6056", // Primary
          500: "#F0533D",
          600: "#E24B3C",
          700: "#D04236",
          800: "#C33C30",
          900: "#B43224",
        },
        success: {
          50: "#dcfff5",
          100: "#b0ffe3",
          200: "#80ffd2",
          300: "#50ffc0",
          400: "#2affaf",
          500: "#1ae695", // Primary
          600: "#0bb374",
          700: "#008052",
          800: "#004d30",
          900: "#001b0e",
        },
        warning: {
          50: "#ffeddf",
          100: "#fcceb6",
          200: "#f5ae8a",
          300: "#ef8f5d",
          400: "#e96f2f", // Primary
          500: "#d05616",
          600: "#a24310",
          700: "#742f09",
          800: "#471b02",
          900: "#1e0700",
        },
        alert: {
          50: "#ffe4e6",
          100: "#fbb9bb",
          200: "#f38d90",
          300: "#ec5f65",
          400: "#e53339", // Primary
          500: "#cc1a1f",
          600: "#a01217",
          700: "#720a10",
          800: "#470507",
          900: "#1f0000",
        },
      },
    },
  },
  plugins: [],
});
