import { Task, TaskCreation } from "@/features/types";

export type TTodoCard = {
  id: string;
  boardId: TTodo["id"];
  columnId: TTodoColumn["id"];
} & Task;

export type TTodoColumn = {
  color?: "green" | "blue";
  id: Task.StatusIds;
  boardId: TTodo["id"];
  title: Task.ReadableStatuses;
  cardOrder: number[];
  cards: Task[];
};

export type TTodo = {
  id: string;
  columns: TTodoColumn[];
};

export type TodoForm = Pick<
  TaskCreation,
  "title" | "isPriority" | "isSentEmail" | "endDate" | "description"
> & {
  assignee: TaskCreation["assignee"]["id"];
  reporter: TaskCreation["reporter"]["id"];
};

export interface ITodoTable {
  fullName: string;
  avatar: string;
  isUnassigned: boolean;
  title: string;
  expiredDate: string;
}
