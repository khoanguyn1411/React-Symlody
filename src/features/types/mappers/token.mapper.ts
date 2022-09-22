import { TokenService } from "@/utils";

import { ITokenDto, ITokenRefreshDto, ITokenRefreshParamDto } from "../dtos";
import { IToken } from "../models";

export class TokenMapper {
  public static fromDto(dto: ITokenDto): IToken {
    return {
      access: dto.access,
      refresh: dto.refresh,
    };
  }

  public static fromRefreshTokenDto(dto: ITokenRefreshDto): IToken {
    const currentToken = TokenService.getToken();
    return {
      access: dto.access,
      refresh: currentToken.refresh,
    };
  }

  public static toParamRefreshDto(model: IToken): ITokenRefreshParamDto {
    return {
      refresh: model.refresh,
    };
  }

  public static toDto(model: IToken): ITokenRefreshDto {
    return {
      access: model.access,
    };
  }
}
