import { ApisauceInstance, create } from "apisauce";

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
            Authorization: "Bearer " + Api.token,
          };
          return request;
        },
        (error) => {
          return error;
        }
      );
      Api.instance.axiosInstance.interceptors.response.use(
        (response) => {
          console.log(response, "--respone");
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
    return Api.token;
  }
}

export { Api };
