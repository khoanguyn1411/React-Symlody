import { IDepartment } from "./department";
import { IGroup } from "./group";
import { ITenant } from "./tenant";
export interface IProfile {
  readonly id: number;
  readonly first_name: string;
  readonly last_name: string;
  readonly email?: string;
  readonly gender: number;
  readonly phone_number: string;
  readonly student_id: string;
  readonly home_town: string;
  readonly dob: string;
  readonly class_name: string;
  readonly avatar?: string;
  readonly address: string;
  readonly department?: IDepartment;

  readonly groups?: IGroup[];
  readonly organization?: ITenant;
}
