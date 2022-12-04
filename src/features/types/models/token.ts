import { StrictPick } from "@/utils/types";

export interface Token {
  access: string;
  refresh: string;
}

export type TokenRefresh = StrictPick<Token, "access">;
export type TokenRefreshCreation = StrictPick<Token, "refresh">;
