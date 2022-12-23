import { ProfileDto, UserDto } from "@/features/types";
import { ChangePasswordDto } from "@/features/types/dtos/change-password.dto";
import { ComposeUrlService } from "@/utils/funcs/compose-url";

import { http } from "../api-core";
import { composeHttpMethodResult } from "../api-utilities";
import { UserApiResponse } from "./types";

const BASE_URL = "user";
const userUrlService = new ComposeUrlService(BASE_URL);

const userUrls = {
  getUsers: userUrlService.getBaseUrl(),
  updateProfile: userUrlService.composeWith(["update_profile"]),
  changePassword: userUrlService.composeWith(["change_password"]),
};

export namespace UserApi {
  export async function getUsers(): Promise<UserApiResponse.GetUsers> {
    const url = userUrls.getUsers;
    const method = http.get<UserDto[]>(url);
    return composeHttpMethodResult(method);
  }

  export async function updateProfile(
    profile: FormData
  ): Promise<UserApiResponse.UpdateProfile> {
    const url = userUrls.updateProfile;
    return composeHttpMethodResult(http.patch<ProfileDto>(url, profile));
  }

  export async function changePassword(
    body: ChangePasswordDto
  ): Promise<UserApiResponse.ChangePassword> {
    const url = userUrls.changePassword;
    return composeHttpMethodResult(http.post<boolean>(url, body));
  }
}
