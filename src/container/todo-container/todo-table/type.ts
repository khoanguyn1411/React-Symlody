import { ReactNode } from "react";

import { Task } from "@/features/types";

export interface ITodoTable {
  id: number;
  job: string;
  status: Task.StatusIds;
  expiredDate: string;
  isPriority: boolean;
  assignee: string;
}

export type TPriority = {
  isPriority: boolean;
  icon: ReactNode;
};
