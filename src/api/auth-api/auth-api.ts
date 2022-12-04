import {
  LoginDto,
  ProfileDto,
  Token,
  TokenDto,
  TokenRefreshDto,
} from "@/features/types";
import { ChangePasswordDto } from "@/features/types/dtos/change-password.dto";
import { TokenMapper } from "@/features/types/mappers/token.mapper";

import { http } from "../api-core";
import { composeHttpMethodResult } from "../api-utilities";
import * as Types from "./types";

const routes = {
  login: () => `login/`,
  refreshToken: () => `login/refresh/`,
  getProfile: () => `login/`,
  updateProfile: () => `user/update_profile/`,
  changePassword: () => `user/change_password/`,
};

export const AuthApi = {
  async login(loginInfo: LoginDto): Promise<Types.RequestLoginResult> {
    const url = routes.login();
    return composeHttpMethodResult(http.post<TokenDto>(url, loginInfo));
  },

  async getProfile(): Promise<Types.RequestGetProfileResult> {
    const url = routes.getProfile();
    return composeHttpMethodResult(http.get<ProfileDto>(url));
  },

  async updateProfile(
    profile: FormData
  ): Promise<Types.RequestUpdateProfileResult> {
    const url = routes.updateProfile();
    return composeHttpMethodResult(http.patch<ProfileDto>(url, profile));
  },

  async changePassword(
    body: ChangePasswordDto
  ): Promise<Types.RequestChangePasswordResult> {
    const url = routes.changePassword();
    return composeHttpMethodResult(http.post<boolean>(url, body));
  },

  async refreshToken(token: Token): Promise<Types.RequestRefreshResult> {
    const tokenRefreshDto = TokenMapper.toTokenRefreshCreationDto(token);
    const url = routes.refreshToken();
    return composeHttpMethodResult(
      http.post<TokenRefreshDto>(url, tokenRefreshDto)
    );
  },
};
