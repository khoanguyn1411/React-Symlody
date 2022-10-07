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

/**
 * Check if token is required for request or not.
 * @param request Request need to be checked.
 */
export function shouldInterceptToken(request: AxiosRequestConfig): boolean {
  if (request.url.includes("login") && request.method === "post") {
    return false;
  }
  return true;
}

/**
 * Get token from local storage.
 * @returns Return null if there is no token in local storage.
 */
export function getToken(): IToken | null {
  return LocalStorageService.getValue<IToken>(APP_LOCAL_STORAGE_KEYS.AUTH);
}

/**
 * Save token to local storage.
 * @param token Token need to be saved.
 */
export function setToken(token: IToken): void {
  LocalStorageService.setValue<IToken>(APP_LOCAL_STORAGE_KEYS.AUTH, token);
}

/**
 * Remove token out of local storage.
 */
export function clearToken(): void {
  LocalStorageService.remove(APP_LOCAL_STORAGE_KEYS.AUTH);
}

/**
 * Check if token is valid (Check if token != null)
 * @returns Return false when token is null, otherwise true.
 */
export function isValid(): boolean {
  const token = getToken();
  if (token == null) {
    return false;
  }
  return true;
}

/**
 * Refresh token when token is expired.
 * @param token Token need to be refreshed.
 * @param api API instance (get from API class).
 */
export async function refreshToken(
  token: IToken,
  api: ApisauceInstance
): Promise<RequestRefreshResult> {
  const tokenRefreshDto = TokenMapper.toParamRefreshDto(token);
  const url = routes.refreshToken();
  const result = await api.post<ITokenRefreshDto>(url, tokenRefreshDto);
  return returnResponse(result);
}
