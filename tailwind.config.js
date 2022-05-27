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
    extend: {},
  },
  plugins: [],
});
