/* eslint-disable prettier/prettier */
module.exports = {
  apps: [
      {
          name: "symphony",
          script: "yarn start",
          env: {
              NODE_ENV: "development",
          },
          env_production: {
              NODE_ENV: "production",
              PORT: 3000,
          },
      },
  ],
};
  