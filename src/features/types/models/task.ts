import { StrictOmit, StrictPick } from "@/utils/types";

import { User } from "./user";

export enum TodoStatusId {
  Todo = "todo",
  InProgress = "in-progress",
  Review = "review",
  Done = "done",
}

export enum TodoStatus {
  Todo = "Cần thực hiện",
  InProgress = "Đang thực hiện",
  Review = "Kiểm tra",
  Done = "Hoàn thành",
}

export enum Priority {
  High = "Cao",
  Normal = "Bình thường",
}

export interface Task {
  id: number;
  assignee: {
    id: number;
  };
  reporter: {
    id: number;
  };
  createdBy: User;
  lastModifiedBy: User | null;
  lastModifiedDate: string;
  title: string;
  label: string;
  description: string;
  startDate: string;
  endDate: string;
  estimation: null | string;
  isPriority: boolean;
  status: TodoStatusId;
  isSentEmail: boolean;
}

export type TaskCreation = StrictPick<Task, "title" | "assignee" | "reporter"> &
  Partial<
    StrictOmit<
      Task,
      | "id"
      | "createdBy"
      | "lastModifiedBy"
      | "lastModifiedDate"
      | "title"
      | "assignee"
      | "reporter"
    >
  >;
