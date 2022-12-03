import { IDepartmentDto } from "./department.dto";

export interface IUserDto {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  department_id: IDepartmentDto["id"];
  avatar: string | null;
}
