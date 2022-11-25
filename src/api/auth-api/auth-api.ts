import { ILoginDto, IProfileDto, ITokenDto } from "@/features/types";
import { IChangePasswordDto } from "@/features/types/dtos/change-password.dto";

import { Api } from "../api-core";
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
    const result = await Api.http.post<ITokenDto>(url, loginInfo);
    return returnResponse(result);
  },

  async getProfile(): Promise<Types.RequestGetProfileResult> {
    const url = routes.getProfile();
    const result = await Api.http.get<IProfileDto>(url);

    return returnResponse(result);
  },

  async updateProfile(
    profile: FormData
  ): Promise<Types.RequestUpdateProfileResult> {
    const url = routes.updateProfile();
    const result = await Api.http.patch<IProfileDto>(url, profile);
    return returnResponse(result);
  },

  async changePassword(
    body: IChangePasswordDto
  ): Promise<Types.RequestChangePasswordResult> {
    const url = routes.changePassword();
    const result = await Api.http.post<boolean>(url, { ...body });

    return returnResponse(result);
  },
};
