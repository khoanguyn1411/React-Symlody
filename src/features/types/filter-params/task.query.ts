import { User } from "../models";

type _TTaskParamQueryDto = {
  department_id: number;
  selected_member_list: User[];
};

export type TTaskParamQueryDto = Partial<_TTaskParamQueryDto>;
