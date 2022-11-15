import { createEntityAdapter } from "@reduxjs/toolkit";

import { ITask } from "@/features/types";
import { TTaskParamQueryDto } from "@/features/types/queries";

export interface TaskStateInner {
  pending: boolean;
  listQueryTask: TTaskParamQueryDto;
}

export const taskAdapter = createEntityAdapter<ITask>({
  selectId: (task) => task.id,
});

export const initialState = taskAdapter.getInitialState<TaskStateInner>({
  pending: false,
  listQueryTask: {},
});

export type TaskState = typeof initialState;
