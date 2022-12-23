import { ProfileDto, TokenDto, TokenRefreshDto } from "@/features/types";

import { Response } from "../api-response";

export type RequestLoginResult = Response<TokenDto>;
export type RequestGetProfileResult = Response<ProfileDto>;
export type RequestLogoutResult = Response<boolean>;

export type RequestRefreshResult = Response<TokenRefreshDto>;
