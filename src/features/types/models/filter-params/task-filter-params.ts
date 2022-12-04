import { User } from "..";

export interface TaskFilterParams {
  departmentId: number;
  selectedMemberList: User[] | null;
}
