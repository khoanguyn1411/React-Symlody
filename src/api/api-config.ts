export const API_URL = process.env.ISPRODUCTION
  ? process.env.REACT_APP_API_URL
  : (process.env.REACT_APP_API_URL_LOCAL as string);
