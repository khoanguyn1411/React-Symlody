export interface IUser {
  readonly id: number;
  readonly first_name: string;
  readonly last_name: string;
  readonly full_name: string;
  readonly email: string;
  readonly avatar: string | null;
}
