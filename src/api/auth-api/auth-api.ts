import {
  IChangePassword,
  ILoginDto,
  IProfileDto,
  ITokenDto,
} from "@/features/types";

import { Api } from "../api-core";
import { returnResponse } from "../api-utilities";
import * as Types from "./types";

const routes = {
  login: () => `login/`,
  refreshToken: () => `login/refresh/`,
  getProfile: () => `login/`,
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

  async changePassword(
    body: IChangePassword
  ): Promise<Types.RequestChangePasswordResult> {
    const url = routes.changePassword();
    const result = await Api.http.post<boolean>(url, { ...body });

    return returnResponse(result);
  },
};
