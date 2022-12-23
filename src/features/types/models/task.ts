import { StrictOmit } from "@/utils/types";

import { User } from "./user";

export namespace Task {
  export enum StatusIds {
    Todo = "todo",
    InProgress = "in-progress",
    Review = "review",
    Done = "done",
  }

  export enum ReadableStatuses {
    Todo = "Cần thực hiện",
    InProgress = "Đang thực hiện",
    Review = "Kiểm tra",
    Done = "Hoàn thành",
  }

  export enum Priority {
    High = "Cao",
    Normal = "Bình thường",
  }
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
  status: Task.StatusIds;
  isSentEmail: boolean;
}

export type TaskCreation = Pick<Task, "title" | "assignee" | "reporter"> &
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
