import { IDepartment } from "./department";

export interface IUser {
  id: number;
  first_name: string;
  last_name: string;
  full_name: string;
  email: string;
  department_id: IDepartment["id"];
  avatar: string | null;
}
