import { ETodoStatus, ETodoStatusId, ITask } from "@/features/types";

export enum EPriority {
  High = "Cao",
  Normal = "Bình thường",
}

export type TTodoCard = {
  id: string;
  boardId: TTodo["id"];
  columnId: TTodoColumn["id"];
} & ITask;

export type TTodoColumn = {
  color?: "green" | "blue";
  id: ETodoStatusId;
  boardId: TTodo["id"];
  title: ETodoStatus;
  cardOrder: number[];
  cards: ITask[];
};

export type TTodo = {
  id: string;
  columns: TTodoColumn[];
};

export interface IFormTodoInfo {
  name: string;
  priority?: string;
  isNotifyEmail?: boolean;
  expiredDate?: string;
  assignee?: number;
  reporter?: number;
  description?: string;
}

export enum ETodoTabReadableString {
  Kanban = "Kanban",
  Table = "Bảng",
}

export enum ETodoTabKey {
  Kanban = "kanban",
  Table = "table",
}

export interface ITodoTable {
  fullName: string;
  avatar: string;
  isUnassigned: boolean;
  title: string;
  expiredDate: string;
}
