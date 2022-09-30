import { ApisauceInstance } from "apisauce";
import { AxiosRequestConfig } from "axios";

import { RequestRefreshResult, returnResponse } from "@/api";
import { APP_LOCAL_STORAGE_KEYS } from "@/constants";
import { IToken, ITokenRefreshDto } from "@/features/types";
import { TokenMapper } from "@/features/types/mappers/token.mapper";

import { LocalStorageService } from ".";

const routes = {
  refreshToken: () => `login/refresh/`,
};

export function shouldInterceptToken(request: AxiosRequestConfig): boolean {
  if (request.url.includes("login") && request.method === "post") {
    return false;
  }
  return true;
}

export function getToken(): IToken | null {
  return LocalStorageService.getValue<IToken>(APP_LOCAL_STORAGE_KEYS.AUTH);
}

export function setToken(token: IToken): void {
  LocalStorageService.setValue<IToken>(APP_LOCAL_STORAGE_KEYS.AUTH, token);
}

export function clearToken(): void {
  LocalStorageService.remove(APP_LOCAL_STORAGE_KEYS.AUTH);
}

export function isValid(): boolean {
  const token = getToken();
  if (token == null) {
    return false;
  }
  return true;
}

export async function refreshToken(
  token: IToken,
  api: ApisauceInstance
): Promise<RequestRefreshResult> {
  const tokenRefreshDto = TokenMapper.toParamRefreshDto(token);
  const url = routes.refreshToken();
  const result = await api.post<ITokenRefreshDto>(url, tokenRefreshDto);
  return returnResponse(result);
}
