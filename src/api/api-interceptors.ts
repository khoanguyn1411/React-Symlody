import { ApisauceInstance } from "apisauce";
import { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

import { TokenMapper } from "@/features/types/mappers/token.mapper";
import { TokenService } from "@/utils";

export function interceptToken(config: AxiosRequestConfig): AxiosRequestConfig {
  const { headers } = config;

  if (!TokenService.shouldInterceptToken(config)) {
    return config;
  }
  const token = TokenService.getToken();

  if (token == null) {
    return config;
  }
  return {
    ...config,
    headers: {
      ...headers,
      Authorization: `Bearer ${token.access}`,
    },
  };
}

let isAlreadyRefreshToken = false;
let isErrorRefresh = false;

export function refreshToken(instance: ApisauceInstance) {
  return async (error: AxiosError): Promise<AxiosResponse> => {
    const token = TokenService.getToken();
    if (token == null) {
      return Promise.reject(error);
    }

    if (error.response == null) {
      return Promise.reject(error);
    }

    if (isErrorRefresh) {
      isErrorRefresh = false;
      TokenService.clearToken();
      return Promise.reject(error);
    }

    if (error.response.status === 401) {
      isAlreadyRefreshToken = false;
      if (error.config.url?.includes("refresh")) {
        isErrorRefresh = true;
      }
      if (!isAlreadyRefreshToken) {
        isAlreadyRefreshToken = true;
        const result = await TokenService.refreshToken(token, instance);
        if (result.kind !== "ok") {
          return Promise.reject(error);
        }
        const newTokenModel = TokenMapper.fromRefreshTokenDto(result.result);
        TokenService.setToken(newTokenModel);
        return instance.axiosInstance.request(error.config);
      }
      return instance.axiosInstance.request(error.config);
    }
    return Promise.reject(error);
  };
}
