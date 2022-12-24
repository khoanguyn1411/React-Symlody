import { ProfileDto, TokenDto, TokenRefreshDto } from "@/features/types";
import { AppResponseDto } from "@/features/types/dtos/app-response.dto";

export namespace AuthApiResponse {
  export type Login = AppResponseDto<TokenDto>;
  export type GetProfile = AppResponseDto<ProfileDto>;
  export type Logout = AppResponseDto<boolean>;
  export type RefreshToken = AppResponseDto<TokenRefreshDto>;
}
