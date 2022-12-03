import { ReactNode } from "react";

import { ETodoStatusId } from "@/features/types";

export interface ITodoTable {
  id: number;
  job: string;
  status: ETodoStatusId;
  expiredDate: string;
  isPriority: boolean;
  assignee: string;
}

export type TPriority = {
  isPriority: boolean;
  icon: ReactNode;
};
