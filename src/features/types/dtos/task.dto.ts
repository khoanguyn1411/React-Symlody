import { StrictOmit } from "@/utils/types";

import { UserDto } from "./user.dto";

export namespace TaskDto {
  export enum PriorityDto {
    Default = 1,
    High = 2,
  }
  export enum StatusIdsDto {
    Todo = 1,
    InProgress = 2,
    Review = 3,
    Done = 4,
  }
}

export interface TaskDto {
  id: number;
  assignee: {
    id: number;
  };
  reporter: {
    id: number;
  };
  created_by: UserDto;
  last_modified_by: UserDto;
  last_modified_date: string;
  title: string;
  label: string;
  description: string;
  start_date: string;
  end_date: string;
  estimation: null | string;
  priority: TaskDto.PriorityDto;
  status: TaskDto.StatusIdsDto;
  sent_email: boolean;
}

export type TaskCreationDto = Pick<TaskDto, "title" | "assignee" | "reporter"> &
  Partial<
    StrictOmit<
      TaskDto,
      | "created_by"
      | "last_modified_by"
      | "last_modified_date"
      | "title"
      | "assignee"
      | "reporter"
    >
  >;
