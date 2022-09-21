import { GlobalTypes } from "@/types";

export interface ITokenDto {
  readonly access: string;
  readonly expires_in: string;
  readonly refresh: string;
  readonly token_type: string;
}

export type ITokenRefreshParamDto = GlobalTypes.StrictPick<
  ITokenDto,
  "refresh"
>;

export type ITokenRefreshDto = GlobalTypes.StrictPick<ITokenDto, "access">;
