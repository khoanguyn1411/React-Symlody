import { IProfileDto, ITokenDto, ITokenRefreshDto } from "@/features/types";

import { Response } from "../types";

export type RequestLoginResult = Response<ITokenDto>;
export type RequestGetProfileResult = Response<IProfileDto>;
export type RequestRefreshResult = Response<ITokenRefreshDto>;
