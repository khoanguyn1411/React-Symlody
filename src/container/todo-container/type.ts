import { Task, TodoStatus, TodoStatusId } from "@/features/types";

export enum Priority {
  High = "Cao",
  Normal = "Bình thường",
}

export type TTodoCard = {
  id: string;
  boardId: TTodo["id"];
  columnId: TTodoColumn["id"];
} & Task;

export type TTodoColumn = {
  color?: "green" | "blue";
  id: TodoStatusId;
  boardId: TTodo["id"];
  title: TodoStatus;
  cardOrder: number[];
  cards: Task[];
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
