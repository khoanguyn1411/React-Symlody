import { IAuthAccount } from "./auth-account";
import { IDepartment } from "./department";
import { ERoles } from "./group";
import { ITenant } from "./tenant";
export interface IProfile extends IAuthAccount {
  readonly id: number;
  readonly gender: "Nam" | "Nữ";
  readonly phone_number: string;
  readonly student_id: string;
  readonly home_town: string;
  readonly dob: string;
  readonly class_name: string;
  readonly avatar: string | null;
  readonly address: string;
  readonly department: IDepartment;
  readonly organization: ITenant;
  readonly profile_id: number;
  readonly isRole: (roles: ERoles[]) => boolean;
}
