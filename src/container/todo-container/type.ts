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
  readonly expiredDate?: string;
  readonly assignee?: number;
  readonly reporter?: number;
  readonly description?: string;
}

export enum ETodoTabReadableString {
  Kanban = "Kanban",
  Board = "Bảng",
}

export enum ETodoTabKey {
  Kanban = "kanban",
  Board = "board",
}

export interface ITodoTable {
  readonly title: string;
  readonly expiredDate: string;
}
