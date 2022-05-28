/* eslint-disable @typescript-eslint/no-var-requires */
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
          25: "#fef7ee",
          40: "#fcf2e5",
          50: "#ffefdd",
          100: "#ffd3b2",
          200: "#fab784",
          300: "#f79c55",
          400: "#f37f26", // Primary
          500: "#d9660c",
          600: "#aa4f07",
          700: "#7a3704",
          800: "#4a2100",
          900: "#1e0800",
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
