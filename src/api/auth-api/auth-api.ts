import { ApiResponse, ApisauceInstance } from "apisauce";

import { IUser } from "@/features";

import { API_URL } from "../api-config";
import { Api } from "../api-core";
import { returnResponse } from "../api-utilities";
import * as Types from "./types";

const prefix = API_URL + "/auth";

const api: ApisauceInstance = Api.getInstance();

const routes = {
  login: () => `${prefix}/login`,
  geProfile: () => `${prefix}/me`,
};

export const AuthApi = {
  async login(
    email: string,
    password: string
  ): Promise<Types.RequestLoginResult> {
    const url = routes.login();

    const result: ApiResponse<{ token: string }> = await api.post(url, {
      email,
      password,
    });

    return returnResponse(result);
  },

  async getProfile(): Promise<Types.RequestGetProfileResult> {
    const url = routes.geProfile();
    const result: ApiResponse<IUser> = await api.get(url);

    return returnResponse(result);
  },
};
