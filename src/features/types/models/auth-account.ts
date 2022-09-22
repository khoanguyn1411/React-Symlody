export interface IAuthAccount {
  readonly first_name: string;
  readonly last_name: string;
  readonly email: string;
  readonly full_name?: string;
  readonly groups: string[];
}
