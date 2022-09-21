import { ApisauceInstance } from "apisauce";

import { ITokenDto } from "@/features/types";
import { IUser } from "@/features/types/dtos/user";

import { API_URL } from "../api-config";
import { Api } from "../api-core";
import { returnResponse } from "../api-utilities";
import * as Types from "./types";

const prefix = API_URL + "/api";

const api: ApisauceInstance = Api.getInstance();

const routes = {
  login: () => `${prefix}/login/`,
  refreshToken: () => `${prefix}/login/refresh/`,
  getProfile: () => `${prefix}/login/`,
};

export const AuthApi = {
  async login(
    username: string,
    password: string
  ): Promise<Types.RequestLoginResult> {
    const url = routes.login();
    const result = await api.post<ITokenDto>(url, {
      username,
      password,
    });
    return returnResponse(result);
  },

  async getProfile(): Promise<Types.RequestGetProfileResult> {
    const url = routes.getProfile();
    const result = await api.get<IUser>(url);

    return returnResponse(result);
  },

  // async refreshToken(token: IToken): Promise<Types.RequestRefreshResult> {
  //   const tokenRefreshDto = TokenMapper.toParamRefreshDto(token);
  //   const url = routes.refreshToken();
  //   const result = await api.post<ITokenRefreshDto>(url, tokenRefreshDto);

  //   return returnResponse(result);
  // },
};
