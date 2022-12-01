import { create } from "apisauce";

import { API_URL } from "./api-config";
import { interceptToken, refreshToken } from "./api-interceptors";

export const http = create({
  baseURL: `${API_URL}/api/`,
});

http.axiosInstance.interceptors.request.use(interceptToken);
http.axiosInstance.interceptors.response.use((response) => {
  return response;
}, refreshToken());
