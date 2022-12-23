import { ProfileDto, UserDto } from "@/features/types/dtos";
import { ChangePasswordDto } from "@/features/types/dtos/change-password.dto";

import { Response } from "../api-response";

export type RequestGetUsersResult = Response<UserDto[]>;

export type RequestUpdateProfileResult = Response<ProfileDto>;
export type RequestChangePasswordResult = Response<boolean, ChangePasswordDto>;
