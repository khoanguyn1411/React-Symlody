import { StrictPick } from "@/utils/types";

export interface TokenDto {
  access: string;
  expires_in: string;
  refresh: string;
  token_type: string;
}

export type TokenRefreshDto = StrictPick<TokenDto, "access">;
export type TokenRefreshCreationDto = StrictPick<TokenDto, "refresh">;
