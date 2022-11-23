import { IUser } from "../models";

type _TTaskParamQueryDto = {
  department_id: number;
  selected_member_list: IUser[];
};

export type TTaskParamQueryDto = Partial<_TTaskParamQueryDto>;
