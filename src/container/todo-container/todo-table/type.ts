import { ReactNode } from "react";

import { ETodoStatusId } from "../type";

export interface ITodoTable {
  readonly id: number;
  readonly job: string;
  readonly status: ETodoStatusId;
  readonly expiredDate: string;
  readonly isPriority: boolean;
  readonly assignee: string;
}

export type TPriority = {
  isPriority: boolean;
  icon: ReactNode;
};
