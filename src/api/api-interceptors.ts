import { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";

import { tokenMapper } from "@/features/types/mappers/token.mapper";
import { TokenService } from "@/utils/funcs/token-service";

import { http } from "./api-core";
import { AuthApi } from "./auth-api";

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

export function refreshToken() {
  return async (error: AxiosError): Promise<AxiosResponse> => {
    const config = error.config;
    const token = TokenService.getToken();
    if (token == null) {
      return Promise.reject(error);
    }

    if (error.response == null) {
      return Promise.reject(error);
    }

    if (config.url?.includes("refresh")) {
      TokenService.clearToken();
      return Promise.reject(error);
    }

    if (error.response.status === 401) {
      const result = await AuthApi.refreshToken(token);
      if (result.kind !== "ok") {
        TokenService.clearToken();
        return Promise.reject(error);
      }
      const newTokenModel = tokenMapper.fromRefreshTokenDto(result.result_dto);
      TokenService.setToken(newTokenModel);
      config.headers["Authorization"] = `Bearer ${newTokenModel.access}`;
      return http.axiosInstance.request(config);
    }
    return Promise.reject(error);
  };
}
