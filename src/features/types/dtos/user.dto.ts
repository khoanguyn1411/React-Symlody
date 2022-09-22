export interface IUserDto {
  readonly user_id: number;
  readonly full_name: string;
  readonly email: string;
  readonly roles: string[];
  readonly avatar_url: string;
}
