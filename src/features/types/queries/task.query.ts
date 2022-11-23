import { IUser } from "../models";

export type TTaskParamQueryDto = {
  department_id?: number;
  selected_member_list?: IUser[];
};
