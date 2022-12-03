import { StrictOmit, StrictPick } from "@/utils/types";

import { IUser } from "./user";

export enum ETodoStatusId {
  Todo = "todo",
  InProgress = "in-progress",
  Review = "review",
  Done = "done",
}

export enum ETodoStatus {
  Todo = "Cần thực hiện",
  InProgress = "Đang thực hiện",
  Review = "Kiểm tra",
  Done = "Hoàn thành",
}

export enum EPriority {
  High = "Cao",
  Normal = "Bình thường",
}

export interface ITask {
  id: number;
  assignee: {
    id: number;
  };
  reporter: {
    id: number;
  };
  created_by: IUser;
  last_modified_by: IUser | null;
  last_modified_date: string;
  title: string;
  label: string;
  description: string;
  start_date: string;
  end_date: string;
  estimation: null | string;
  isPriority: boolean;
  status: ETodoStatusId;
  sent_email: boolean;
}

export type ITaskCreateUpdate = StrictPick<
  ITask,
  "title" | "assignee" | "reporter"
> &
  Partial<
    StrictOmit<
      ITask,
      | "id"
      | "created_by"
      | "last_modified_by"
      | "last_modified_date"
      | "title"
      | "assignee"
      | "reporter"
    >
  >;
