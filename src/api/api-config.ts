export const API_URL =
  process.env.REACT_APP_IS_PRODUCT === "true"
    ? (process.env.REACT_APP_WEB_API as string)
    : (process.env.REACT_APP_WEB_API_LOCAL as string);
