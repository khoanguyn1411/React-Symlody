export interface TokenDto {
  access: string;
  expires_in: string;
  refresh: string;
  token_type: string;
}

export type TokenRefreshDto = Pick<TokenDto, "access">;
export type TokenRefreshCreationDto = Pick<TokenDto, "refresh">;
