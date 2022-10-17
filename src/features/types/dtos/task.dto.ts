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
  readonly id: number;
  readonly assignee: {
    readonly id: number;
  };
  readonly reporter: {
    readonly id: number;
  };
  readonly created_by: IUserDto;
  readonly last_modified_by: IUserDto;
  readonly last_modified_date: string;
  readonly title: string;
  readonly label: string;
  readonly description: string;
  readonly start_date: string;
  readonly end_date: string;
  readonly estimation: null | string;
  readonly priority: EPriorityDto;
  readonly status: ETaskStatusDto;
  readonly sent_email: boolean;
}
