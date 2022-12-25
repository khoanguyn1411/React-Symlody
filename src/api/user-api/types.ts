import { AppResponseDto, ProfileDto, UserDto } from "@/features/types/dtos";
import { ChangePasswordDto } from "@/features/types/dtos/change-password.dto";

export namespace UserApiResponse {
  export type GetUsers = AppResponseDto<UserDto[]>;
  export type UpdateProfile = AppResponseDto<ProfileDto>;
  export type ChangePassword = AppResponseDto<boolean, ChangePasswordDto>;
}
