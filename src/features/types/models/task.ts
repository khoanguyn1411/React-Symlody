import { IUser } from "./user";

export enum ETodoStatusId {
  Todo = "todo",
  InProgress = "in-progress",
  Review = "review",
  Done = "done",
}

export enum ETodoStatus {
  Todo = "Cần làm",
  InProgress = "Đang làm",
  Review = "Cần duyệt",
  Done = "Đã xong",
}

export enum EPriority {
  High = "Cao",
  Normal = "Bình thường",
}

export interface ITask {
  readonly id: number;
  readonly assignee: {
    readonly id: number;
  };
  readonly reporter: {
    readonly id: number;
  };
  readonly created_by: IUser;
  readonly last_modified_by: IUser;
  readonly last_modified_date: string;
  readonly title: string;
  readonly label: string;
  readonly description: string;
  readonly start_date: string;
  readonly end_date: string;
  readonly estimation: null | string;
  readonly isPriority: boolean;
  readonly status: ETodoStatusId;
  readonly sent_email: boolean;
}

// export interface ITaskCreateUpdate {
//   readonly id: number;
//   readonly assignee: {
//     readonly id: number;
//   };
//   readonly reporter: {
//     readonly id: number;
//   };
//   readonly title: string;
//   readonly label: string;
//   readonly description: string;
//   readonly start_date: string;
//   readonly end_date: string;
//   readonly estimation: null | string;
//   readonly isPriority: boolean;
//   readonly status: ETodoStatusId;
//   readonly sent_email: boolean;
// }
