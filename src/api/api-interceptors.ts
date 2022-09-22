import { ApisauceInstance } from "apisauce";
import { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

import { TokenMapper } from "@/features/types/mappers/token.mapper";
import { TokenService } from "@/utils";

export function interceptToken(config: AxiosRequestConfig): AxiosRequestConfig {
  if (!TokenService.shouldInterceptToken(config)) {
    return config;
  }
  const token = TokenService.getToken();
  if (token == null) {
    return config;
  }
  config.headers["Authorization"] = `Bearer ${token.access}`;
  return config;
}

let isAlreadyRefreshToken = false;
export function refreshToken(instance: ApisauceInstance) {
  return async (error: AxiosError): Promise<AxiosResponse> => {
    const config = error.config;
    const token = TokenService.getToken();
    if (token == null) {
      return Promise.reject(error);
    }

    if (error.response == null) {
      return Promise.reject(error);
    }

    if (error.response.status === 401) {
      if (config.url?.includes("refresh")) {
        return Promise.reject(error);
      }
      if (!isAlreadyRefreshToken) {
        isAlreadyRefreshToken = true;
        const result = await TokenService.refreshToken(token, instance);
        if (result.kind !== "ok") {
          TokenService.clearToken();
          return Promise.reject(error);
        }
        const newTokenModel = TokenMapper.fromRefreshTokenDto(result.result);
        TokenService.setToken(newTokenModel);
      }
      config.headers["Authorization"] = `Bearer ${token.access}`;
      return instance.axiosInstance.request(config);
    }
    return Promise.reject(error);
  };
}
