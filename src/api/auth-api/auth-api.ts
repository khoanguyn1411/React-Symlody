import {
  LoginDto,
  ProfileDto,
  Token,
  TokenDto,
  TokenRefreshDto,
} from "@/features/types";
import { tokenMapper } from "@/features/types/mappers/token.mapper";
import { ComposeUrlService } from "@/utils/funcs/compose-url";

import { http } from "../api-core";
import { composeHttpMethodResult } from "../api-utilities";
import { AuthApiResponse } from "./types";

const BASE_PATH_LOGIN = "login";
const BASE_PATH_LOGOUT = "logout";
const loginUrlService = new ComposeUrlService(BASE_PATH_LOGIN);
const logoutUrlService = new ComposeUrlService(BASE_PATH_LOGOUT);

const loginUrls = {
  login: loginUrlService.getBaseUrl(),
  logout: logoutUrlService.getBaseUrl(),
  refreshToken: loginUrlService.concatWith(["refresh"]),
  getProfile: loginUrlService.getBaseUrl(),
};

export namespace AuthApi {
  export async function login(
    loginInfo: LoginDto
  ): Promise<AuthApiResponse.Login> {
    const url = loginUrls.login;
    return composeHttpMethodResult(http.post<TokenDto>(url, loginInfo));
  }

  export async function getProfile(): Promise<AuthApiResponse.GetProfile> {
    const url = loginUrls.getProfile;
    return composeHttpMethodResult(http.get<ProfileDto>(url));
  }
  export async function logout(): Promise<AuthApiResponse.Logout> {
    const url = loginUrls.logout;
    return composeHttpMethodResult(http.post<boolean>(url));
  }

  export async function refreshToken(
    token: Token
  ): Promise<AuthApiResponse.RefreshToken> {
    const tokenRefreshDto = tokenMapper.toTokenRefreshCreationDto(token);
    const url = loginUrls.refreshToken;
    return composeHttpMethodResult(
      http.post<TokenRefreshDto>(url, tokenRefreshDto)
    );
  }
}
