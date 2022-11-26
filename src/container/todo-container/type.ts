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
  readonly name: string;
  readonly priority?: string;
  readonly isNotifyEmail?: boolean;
  readonly expiredDate?: string;
  readonly assignee?: number;
  readonly reporter?: number;
  readonly description?: string;
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
  readonly fullName: string;
  readonly avatar: string;
  readonly isUnassigned: boolean;
  readonly title: string;
  readonly expiredDate: string;
}
