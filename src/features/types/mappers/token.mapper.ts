import { TokenService } from "@/utils/funcs/token-service";

import { TokenDto, TokenRefreshCreationDto, TokenRefreshDto } from "../dtos";
import { Token } from "../models";
import { IMapperFromDto } from "./base-mappers/mapper";

export class TokenMapper implements IMapperFromDto<TokenDto, Token> {
  public fromDto(dto: TokenDto): Token {
    return {
      access: dto.access,
      refresh: dto.refresh,
    };
  }

  public fromRefreshTokenDto(dto: TokenRefreshDto): Token {
    const currentToken = TokenService.getToken();
    return {
      access: dto.access,
      refresh: currentToken.refresh,
    };
  }

  public toTokenRefreshCreationDto(model: Token): TokenRefreshCreationDto {
    return {
      refresh: model.refresh,
    };
  }
}

export const tokenMapper = new TokenMapper();
