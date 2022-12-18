export interface Token {
  access: string;
  refresh: string;
}

export type TokenRefresh = Pick<Token, "access">;
export type TokenRefreshCreation = Pick<Token, "refresh">;
