import { GlobalTypes } from "@/utils";

export interface ITokenDto {
  access: string;
  expires_in: string;
  refresh: string;
  token_type: string;
}

export type ITokenRefreshParamDto = GlobalTypes.StrictPick<
  ITokenDto,
  "refresh"
>;

export type ITokenRefreshDto = GlobalTypes.StrictPick<ITokenDto, "access">;
