import { ApisauceInstance, create } from "apisauce";
import { AxiosRequestConfig } from "axios";

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
          if (this.shouldInterceptToken(request)) {
            request.headers = {
              Accept: "*/*",
              Authorization: Api.token ? "Bearer " + Api.token : undefined,
            };
          } else {
            request.headers = {
              Accept: "*/*",
            };
          }
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

  public static shouldInterceptToken(request: AxiosRequestConfig) {
    if (request.url.includes("login") && request.method === "post") {
      return false;
    }
    return true;
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
