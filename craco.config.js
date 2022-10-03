/* eslint-disable @typescript-eslint/no-var-requires */ /* eslint-disable prettier/prettier */
const path = require("path");
module.exports = {
    webpack: {
        alias: {
            "@": path.resolve(__dirname, "src"),
        },
        devServer: {
            host: '0.0.0.0',
            port: 3000
        }
    },
    style: {
        postOptions: {
            plugins: [require("tailwindcss"), require("autoprefixer")],
        },
    },
};


