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
const loginUrls = new ComposeUrlService(BASE_URL_LOGIN);
const logoutUrls = new ComposeUrlService(BASE_URL_LOGOUT);

const apiModuleUrls = {
  login: loginUrls.getBaseUrl(),
  logout: logoutUrls.getBaseUrl(),
  refreshToken: loginUrls.composeWith(["refresh"]),
  getProfile: loginUrls.getBaseUrl(),
};

export const AuthApi = {
  async login(loginInfo: LoginDto): Promise<Types.RequestLoginResult> {
    const url = apiModuleUrls.login;
    return composeHttpMethodResult(http.post<TokenDto>(url, loginInfo));
  },

  async getProfile(): Promise<Types.RequestGetProfileResult> {
    const url = apiModuleUrls.getProfile;
    return composeHttpMethodResult(http.get<ProfileDto>(url));
  },

  async logout(): Promise<Types.RequestLogoutResult> {
    const url = apiModuleUrls.logout;
    return composeHttpMethodResult(http.post<boolean>(url));
  },

  async refreshToken(token: Token): Promise<Types.RequestRefreshResult> {
    const tokenRefreshDto = tokenMapper.toTokenRefreshCreationDto(token);
    const url = apiModuleUrls.refreshToken;
    return composeHttpMethodResult(
      http.post<TokenRefreshDto>(url, tokenRefreshDto)
    );
  },
};
