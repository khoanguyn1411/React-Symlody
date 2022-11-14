import { ETodoStatus, ETodoStatusId, ITask } from "@/features/types";

import { TTodoCardProps } from "./todo-kanban";

export enum EPriority {
  High = "Cao",
  Normal = "Bình thường",
}

export const TODO_STATUS_MAP_FROM_ID: Readonly<
  Record<ETodoStatusId, ETodoStatus>
> = {
  [ETodoStatusId.Todo]: ETodoStatus.Todo,
  [ETodoStatusId.InProgress]: ETodoStatus.InProgress,
  [ETodoStatusId.Review]: ETodoStatus.Review,
  [ETodoStatusId.Done]: ETodoStatus.Done,
};

export type TTodoCard = {
  id: string;
  boardId: TTodo["id"];
  columnId: TTodoColumn["id"];
} & TTodoCardProps;

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
