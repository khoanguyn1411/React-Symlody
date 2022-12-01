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
import { returnResponse } from "../api-utilities";
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
    const result = await http.post<ITokenDto>(url, loginInfo);
    return returnResponse(result);
  },

  async getProfile(): Promise<Types.RequestGetProfileResult> {
    const url = routes.getProfile();
    const result = await http.get<IProfileDto>(url);

    return returnResponse(result);
  },

  async updateProfile(
    profile: FormData
  ): Promise<Types.RequestUpdateProfileResult> {
    const url = routes.updateProfile();
    const result = await http.patch<IProfileDto>(url, profile);
    return returnResponse(result);
  },

  async changePassword(
    body: IChangePasswordDto
  ): Promise<Types.RequestChangePasswordResult> {
    const url = routes.changePassword();
    const result = await http.post<boolean>(url, { ...body });

    return returnResponse(result);
  },

  async refreshToken(token: IToken): Promise<Types.RequestRefreshResult> {
    const tokenRefreshDto = TokenMapper.toParamRefreshDto(token);
    const url = routes.refreshToken();
    const result = await http.post<ITokenRefreshDto>(url, tokenRefreshDto);
    return returnResponse(result);
  },
};
