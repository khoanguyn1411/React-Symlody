import { ProfileDto, TokenDto, TokenRefreshDto } from "@/features/types";
import { ChangePasswordDto } from "@/features/types/dtos/change-password.dto";

import { Response } from "../api-response";

export type RequestLoginResult = Response<TokenDto>;
export type RequestGetProfileResult = Response<ProfileDto>;
export type RequestUpdateProfileResult = Response<ProfileDto>;
export type RequestRefreshResult = Response<TokenRefreshDto>;

export type RequestChangePasswordResult = Response<boolean, ChangePasswordDto>;
