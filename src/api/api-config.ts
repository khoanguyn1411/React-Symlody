export const API_URL =
  process.env.IS_PRODUCT === "true"
    ? (process.env.WEB_API as string)
    : (process.env.WEB_API_LOCAL as string);
