import { IDepartmentDto } from "./department.dto";

export interface IUserDto {
  readonly id: number;
  readonly first_name: string;
  readonly last_name: string;
  readonly email: string;
  readonly department_id: IDepartmentDto["id"];
  readonly avatar: string | null;
}
