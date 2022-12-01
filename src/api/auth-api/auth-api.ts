import {
  ILoginDto,
  IProfileDto,
  IToken,
  ITokenDto,
  ITokenRefreshDto,
} from "@/features/types";
import { IChangePasswordDto } from "@/features/types/dtos/change-password.dto";
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
  async login(loginInfo: ILoginDto): Promise<Types.RequestLoginResult> {
    const url = routes.login();
    return composeHttpMethodResult(http.post<ITokenDto>(url, loginInfo));
  },

  async getProfile(): Promise<Types.RequestGetProfileResult> {
    const url = routes.getProfile();
    return composeHttpMethodResult(http.get<IProfileDto>(url));
  },

  async updateProfile(
    profile: FormData
  ): Promise<Types.RequestUpdateProfileResult> {
    const url = routes.updateProfile();
    return composeHttpMethodResult(http.patch<IProfileDto>(url, profile));
  },

  async changePassword(
    body: IChangePasswordDto
  ): Promise<Types.RequestChangePasswordResult> {
    const url = routes.changePassword();
    return composeHttpMethodResult(http.post<boolean>(url, body));
  },

  async refreshToken(token: IToken): Promise<Types.RequestRefreshResult> {
    const tokenRefreshDto = TokenMapper.toParamRefreshDto(token);
    const url = routes.refreshToken();
    return composeHttpMethodResult(
      http.post<ITokenRefreshDto>(url, tokenRefreshDto)
    );
  },
};
