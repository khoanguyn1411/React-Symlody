import { AxiosRequestConfig } from "axios";

import { APP_LOCAL_STORAGE_KEYS } from "@/constants";
import { Token } from "@/features/types";

import { LocalStorageService } from ".";

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
export function getToken(): Token | null {
  return LocalStorageService.getValue<Token>(APP_LOCAL_STORAGE_KEYS.AUTH);
}

/**
 * Save token to local storage.
 * @param token Token need to be saved.
 */
export function setToken(token: Token): void {
  LocalStorageService.setValue<Token>(APP_LOCAL_STORAGE_KEYS.AUTH, token);
}

/**
 * Remove token out of local storage.
 */
export function clearToken(): void {
  LocalStorageService.remove(APP_LOCAL_STORAGE_KEYS.AUTH);
}

/**
 * Check if token is valid (Check if token != null).
 * @returns Return false when token is null, otherwise true.
 */
export function isValid(): boolean {
  const token = getToken();
  if (token == null) {
    return false;
  }
  return true;
}
