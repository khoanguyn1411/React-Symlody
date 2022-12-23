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
import * as Types from "./types";

const BASE_URL_LOGIN = "login";
const BASE_URL_LOGOUT = "logout";
const loginUrlService = new ComposeUrlService(BASE_URL_LOGIN);
const logoutUrlService = new ComposeUrlService(BASE_URL_LOGOUT);

const loginUrls = {
  login: loginUrlService.getBaseUrl(),
  logout: logoutUrlService.getBaseUrl(),
  refreshToken: loginUrlService.composeWith(["refresh"]),
  getProfile: loginUrlService.getBaseUrl(),
};

export const AuthApi = {
  async login(loginInfo: LoginDto): Promise<Types.RequestLoginResult> {
    const url = loginUrls.login;
    return composeHttpMethodResult(http.post<TokenDto>(url, loginInfo));
  },

  async getProfile(): Promise<Types.RequestGetProfileResult> {
    const url = loginUrls.getProfile;
    return composeHttpMethodResult(http.get<ProfileDto>(url));
  },

  async logout(): Promise<Types.RequestLogoutResult> {
    const url = loginUrls.logout;
    return composeHttpMethodResult(http.post<boolean>(url));
  },

  async refreshToken(token: Token): Promise<Types.RequestRefreshResult> {
    const tokenRefreshDto = tokenMapper.toTokenRefreshCreationDto(token);
    const url = loginUrls.refreshToken;
    return composeHttpMethodResult(
      http.post<TokenRefreshDto>(url, tokenRefreshDto)
    );
  },
};
