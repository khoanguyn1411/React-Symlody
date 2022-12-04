import { TokenService } from "@/utils";

import { TokenDto, TokenRefreshCreationDto, TokenRefreshDto } from "../dtos";
import { Token } from "../models";

export class TokenMapper {
  public static fromDto(dto: TokenDto): Token {
    return {
      access: dto.access,
      refresh: dto.refresh,
    };
  }

  public static fromRefreshTokenDto(dto: TokenRefreshDto): Token {
    const currentToken = TokenService.getToken();
    return {
      access: dto.access,
      refresh: currentToken.refresh,
    };
  }

  public static toTokenRefreshCreationDto(
    model: Token
  ): TokenRefreshCreationDto {
    return {
      refresh: model.refresh,
    };
  }
}
