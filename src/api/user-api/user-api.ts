import { ProfileDto, UserDto } from "@/features/types";
import { ChangePasswordDto } from "@/features/types/dtos/change-password.dto";
import { ComposeUrlService } from "@/utils/funcs/compose-url";

import { http } from "../api-core";
import { composeHttpMethodResult } from "../api-utilities";
import * as Types from "./types";

const BASE_URL = "user";
const userUrls = new ComposeUrlService(BASE_URL);

const apiModuleUrls = {
  getUsers: userUrls.getBaseUrl(),
  updateProfile: userUrls.composeWith(["update_profile"]),
  changePassword: userUrls.composeWith(["change_password"]),
};

export const UserApi = {
  async getUsers(): Promise<Types.RequestGetUsersResult> {
    const url = apiModuleUrls.getUsers;
    const method = http.get<UserDto[]>(url);
    return composeHttpMethodResult(method);
  },

  async updateProfile(
    profile: FormData
  ): Promise<Types.RequestUpdateProfileResult> {
    const url = apiModuleUrls.updateProfile;
    return composeHttpMethodResult(http.patch<ProfileDto>(url, profile));
  },

  async changePassword(
    body: ChangePasswordDto
  ): Promise<Types.RequestChangePasswordResult> {
    const url = apiModuleUrls.changePassword;
    return composeHttpMethodResult(http.post<boolean>(url, body));
  },
};
