import { IProfileDto, TokenDto, TokenRefreshDto } from "@/features/types";

import { Response } from "../api-response";

export type RequestLoginResult = Response<TokenDto>;
export type RequestGetProfileResult = Response<IProfileDto>;
export type RequestUpdateProfileResult = Response<IProfileDto>;
export type RequestRefreshResult = Response<TokenRefreshDto>;

export type RequestChangePasswordResult = Response<boolean>;
