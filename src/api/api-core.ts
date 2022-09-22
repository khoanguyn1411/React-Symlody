import { ApisauceInstance, create } from "apisauce";

import { API_URL } from "./api-config";
import { interceptToken, refreshToken } from "./api-interceptors";

class Api {
  private static instance: ApisauceInstance;

  public static getInstance(): ApisauceInstance {
    if (!Api.instance) {
      Api.instance = create({ baseURL: `${API_URL}/api/` });

      Api.instance.axiosInstance.interceptors.request.use(interceptToken);
      Api.instance.axiosInstance.interceptors.response.use((response) => {
        return response;
      }, refreshToken(Api.instance));
    }
    return Api.instance;
  }
  public static http = this.getInstance();
}

export { Api };
