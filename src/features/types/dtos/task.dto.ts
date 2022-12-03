import { StrictOmit, StrictPick } from "@/utils/types";

import { IUserDto } from "./user.dto";

export enum EPriorityDto {
  Default = 1,
  High = 2,
}

export enum ETaskStatusDto {
  Todo = 1,
  InProgress = 2,
  Review = 3,
  Done = 4,
}

export interface ITaskDto {
  id: number;
  assignee: {
    id: number;
  };
  reporter: {
    id: number;
  };
  created_by: IUserDto;
  last_modified_by: IUserDto;
  last_modified_date: string;
  title: string;
  label: string;
  description: string;
  start_date: string;
  end_date: string;
  estimation: null | string;
  priority: EPriorityDto;
  status: ETaskStatusDto;
  sent_email: boolean;
}

export type ITaskCreateUpdateDto = StrictPick<
  ITaskDto,
  "title" | "assignee" | "reporter"
> &
  Partial<
    StrictOmit<
      ITaskDto,
      | "created_by"
      | "last_modified_by"
      | "last_modified_date"
      | "title"
      | "assignee"
      | "reporter"
    >
  >;
