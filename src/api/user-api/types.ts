import { ProfileDto, UserDto } from "@/features/types/dtos";
import { ChangePasswordDto } from "@/features/types/dtos/change-password.dto";

import { Response } from "../api-response";

export namespace UserApiResponse {
  export type GetUsers = Response<UserDto[]>;
  export type UpdateProfile = Response<ProfileDto>;
  export type ChangePassword = Response<boolean, ChangePasswordDto>;
}
