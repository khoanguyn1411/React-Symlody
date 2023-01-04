import { ProfileDto, UserDto } from "@/features/types";
import { ChangePasswordDto } from "@/features/types/dtos/change-password.dto";
import { UserFilterParamsDto } from "@/features/types/dtos/filter-params/user-filter-param.dto";
import { ComposeUrlService } from "@/utils/funcs/compose-url";

import { http } from "../api-core";
import { composeHttpMethodResult } from "../api-utilities";
import { UserApiResponse } from "./types";

const BASE_PATH = "user";
const userUrlService = new ComposeUrlService(BASE_PATH);

const userUrls = {
  getUsers: userUrlService.getBaseUrl(),
  updateProfile: userUrlService.concatWith(["update_profile"]),
  changePassword: userUrlService.concatWith(["change_password"]),
};

export namespace UserApi {
  export async function getUsers(
    params: UserFilterParamsDto | null
  ): Promise<UserApiResponse.GetUsers> {
    const url = userUrls.getUsers;
    const method = http.get<UserDto[]>(url, params);
    return composeHttpMethodResult(method);
  }

  export async function updateProfile(
    profile: FormData
  ): Promise<UserApiResponse.UpdateProfile> {
    const url = userUrls.updateProfile;
    const method = http.patch<ProfileDto>(url, profile);
    return composeHttpMethodResult(method);
  }

  export async function changePassword(
    body: ChangePasswordDto
  ): Promise<UserApiResponse.ChangePassword> {
    const url = userUrls.changePassword;
    const method = http.post<boolean>(url, body);
    return composeHttpMethodResult(method);
  }
}
