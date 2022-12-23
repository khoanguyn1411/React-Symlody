import { ProfileDto, TokenDto, TokenRefreshDto } from "@/features/types";

import { Response } from "../api-response";

export namespace AuthApiResponse {
  export type Login = Response<TokenDto>;
  export type GetProfile = Response<ProfileDto>;
  export type Logout = Response<boolean>;
  export type RefreshToken = Response<TokenRefreshDto>;
}
