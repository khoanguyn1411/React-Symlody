import { ReactNode } from "react";

import { TodoStatusId } from "@/features/types";

export interface ITodoTable {
  id: number;
  job: string;
  status: TodoStatusId;
  expiredDate: string;
  isPriority: boolean;
  assignee: string;
}

export type TPriority = {
  isPriority: boolean;
  icon: ReactNode;
};
