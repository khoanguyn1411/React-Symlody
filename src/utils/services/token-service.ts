import { ApisauceInstance } from "apisauce";
import { AxiosRequestConfig } from "axios";

import { RequestRefreshResult, returnResponse } from "@/api";
import { APP_CONSTANTS } from "@/constants";
import { IToken, ITokenRefreshDto } from "@/features/types";
import { TokenMapper } from "@/features/types/mappers/token.mapper";

import { LocalStorageService } from "./local-storage-service";

const routes = {
  refreshToken: () => `login/refresh/`,
};

export class TokenService {
  public static shouldInterceptToken(request: AxiosRequestConfig): boolean {
    if (request.url.includes("login") && request.method === "post") {
      return false;
    }
    return true;
  }

  public static getToken(): IToken | null {
    return LocalStorageService.getValue<IToken>(APP_CONSTANTS.AUTH);
  }

  public static setToken(token: IToken): void {
    LocalStorageService.setValue<IToken>(APP_CONSTANTS.AUTH, token);
  }

  public static clearToken(): void {
    LocalStorageService.remove(APP_CONSTANTS.AUTH);
  }

  public static isValid(): boolean {
    const token = TokenService.getToken();
    if (token == null) {
      return false;
    }
    return true;
  }

  public static async refreshToken(
    token: IToken,
    api: ApisauceInstance
  ): Promise<RequestRefreshResult> {
    const tokenRefreshDto = TokenMapper.toParamRefreshDto(token);
    const url = routes.refreshToken();
    const result = await api.post<ITokenRefreshDto>(url, tokenRefreshDto);
    return returnResponse(result);
  }
}
