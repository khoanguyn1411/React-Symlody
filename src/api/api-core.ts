import { ApisauceInstance, create } from "apisauce";

import { APP_CONSTANTS } from "@/constants";

import { API_URL } from "./api-config";

class Api {
  private static instance: ApisauceInstance;
  private static token: string;

  public static getInstance(): ApisauceInstance {
    if (!Api.instance) {
      Api.instance = create({ baseURL: API_URL });

      Api.instance.axiosInstance.interceptors.request.use(
        (request) => {
          request.headers = {
            Accept: "*/*",
            Authorization: Api.token ? "Bearer " + Api.token : undefined,
          };
          return request;
        },
        (error) => {
          return error;
        }
      );
      Api.instance.axiosInstance.interceptors.response.use(
        (response) => {
          return response;
        },
        (error) => {
          return error;
        }
      );
    }
    return Api.instance;
  }

  public static getToken() {
    const token = localStorage.getItem(APP_CONSTANTS.AUTH);
    return token;
  }

  public static setToken(token: string) {
    Api.token = token || "";
  }

  public static clearToken() {
    localStorage.removeItem(APP_CONSTANTS.AUTH);
  }
}

export { Api };
